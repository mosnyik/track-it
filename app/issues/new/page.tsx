"use client";
import { useState } from "react";
import { Button, Callout, Heading, Text, TextField } from "@radix-ui/themes";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { createIssueSchema } from "../../validationShemas";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import "easymde/dist/easymde.min.css";
import IssueHeading from "@/app/components/IssueHeading";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const onSubmit: SubmitHandler<IssueInput> = async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
      setIsSubmitting(false);
    } catch (err) {
      console.log("An error occured", err);
      setIsSubmitting(false);
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
        <IssueHeading>Add Issue Title</IssueHeading>
        <TextField.Root placeholder="Title" {...register("title")} />

        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <IssueHeading>Add Issue Description</IssueHeading>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            Submit New Issue {isSubmitting && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueNewPage;
