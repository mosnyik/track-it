"use client";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import { createIssueSchema } from "../../validationShemas";
import { zodResolver } from "@hookform/resolvers/zod";

type IssueInput = z.infer<typeof createIssueSchema>;

const IssueNewPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueInput>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");

  const router = useRouter();
  const onSubmit: SubmitHandler<IssueInput> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error have occured");
    }
  };

  return (
    <div className="space-y-3 max-w-xl">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3 " onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && (
          <Text as="p" color="red">
            Title is required
          </Text>
        )}
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text as="p" color="red">
            Description is required
          </Text>
        )}
        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default IssueNewPage;
