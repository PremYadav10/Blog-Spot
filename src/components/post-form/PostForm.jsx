import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [imageError, setImageError] = useState("");

    // Load existing featured image preview if editing a post
    useEffect(() => {
        const fetchPreview = async () => {
            if (post?.featuredImage) {
                try {
                    const url = await appwriteService.getFilePreview(post.featuredImage);
                    setImagePreview(url.href || url);
                } catch (err) {
                    console.error("Failed to fetch image preview", err);
                }
            }
        };
        fetchPreview();
    }, [post]);



    const submit = async (data) => {
        setImageError(""); // Reset previous error

        // Validate image for new post
        if (!post && (!data.image || data.image.length === 0)) {
            setImageError("Image is required to make a post.");
            return;
        }

        setLoading(true);

        try {
            if (post) {
                const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file && post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);
                const fileId = file.$id;
                data.featuredImage = fileId;

                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        } catch (err) {
            console.error("Post creation/update failed:", err);
            alert("Something went wrong Please Refresh the page!");
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-");
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Select Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                    onChange={(e) => {
                        if (e.target.files[0]) {
                            setImagePreview(URL.createObjectURL(e.target.files[0]));
                            setImageError(""); // clear error if image selected
                        }
                    }}
                />
                {(!post && !imagePreview) && (
                    <p className="text-md text-black text-center rounded mb-3 bg-white ">Image Is Required To Create A Post</p>
                )}
                {imagePreview && (
                    <div className="w-full mb-4">
                        <img
                            src={imagePreview}
                            alt={post?.title || "preview"}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                {imageError && (
                    <p className="text-red-500 text-sm mb-2">{imageError}</p>
                )}

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full flex justify-center items-center"
                    disabled={loading}
                >
                    {loading && (
                        <span className="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                    )}
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
