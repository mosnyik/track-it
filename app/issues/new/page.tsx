"use client";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@radix-ui/themes";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
interface IssueInput {
  title: string;
  description: string;
}

const IssueNewPage = () => {
  const { register, handleSubmit, control } = useForm<IssueInput>();
  const router = useRouter();
  const onSubmit: SubmitHandler<IssueInput> = async (data) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  };

  return (
    <form className="space-y-3 max-w-xl" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root placeholder="Title" {...register("title")} />
      <Controller
        control={control}
        name="description"
        rules={{ required: true }}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Button type="submit">Submit New Issue</Button>
    </form>
  );
};

export default IssueNewPage;
