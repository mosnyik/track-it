"use client";
import { useState } from "react";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { issueSchema } from "../../validationShemas";
import { zodResolver } from "@hookform/resolvers/zod";
import "easymde/dist/easymde.min.css";
import { ErrorMessage, Spinner, IssueHeading } from "@/app/components";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";

// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });
type IssueInput = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const EditIssue = ({ issue }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueInput>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const onSubmit: SubmitHandler<IssueInput> = async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
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
        <TextField.Root
          placeholder="Title"
          {...register("title")}
          defaultValue={issue?.title}
        />

        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <IssueHeading>Add Issue Description</IssueHeading>
        <Controller
          control={control}
          name="description"
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {issue ? "Update Issue" : "Submit New Issue"}{" "}
            {isSubmitting && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditIssue;
