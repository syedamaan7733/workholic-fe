import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { deleteEmployee } from "@/src/services/employeeService";
import { toast } from "sonner";

function DeleteAlert({ delAlert, setdelAlert, id }) {
  // Deleting the Employee
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee", id] });
      toast.success("Employee Deleted");
      setdelAlert(!delAlert);
    },
    onError: (error) => {
      toast.error(`Failed to delete employee: ${error.message}`);
    },
  });

  //   console.log(id);

  return (
    <div className="absolute flex justify-center items-center top-0 left-0 h-screen w-full  bg-black/35 z-100">
      <Card className="bg-gray-200 flex justify-center w-[340px]">
        <CardHeader>
          <CardTitle className="text-2xl">Delete Alert</CardTitle>
        </CardHeader>
        <CardContent>Are sure you want to delete this employee?</CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={"outline"} onClick={() => setdelAlert(!delAlert)}>
            Cancel
          </Button>
          <Button
            onClick={() => deleteMutation.mutate(id)}
            className="bg-red-600 hover:bg-red-800"
          >
            {deleteMutation.isPending ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default DeleteAlert;
