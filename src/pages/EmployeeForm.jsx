import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { ArrowLeft, Loader2, Save, Text, Upload, User } from "lucide-react";

import {
  getEmployeeById,
  createEmployee,
  updateEmployee,
  uploadImage,
} from "../services/employeeService";

import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!id;
  const [file, setfile] = useState(null);

  // // --------------------------------------------------------
  // const [imageUrl, setImageUrl] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const fileInputRef = React.useRef(null);
  // // --------------------------------------------------------

  // Fetch employee data if in edit mode
  const { data: employeeData, isLoading: isLoadingEmployee } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployeeById(id),
    enabled: isEditMode,
    onSuccess: (data) => {
      // Format the date to YYYY-MM-DD for the input field
      const formattedDate = data.hireDate
        ? new Date(data.hireDate).toISOString().split("T")[0]
        : "";

      setFormData({
        ...data,
        hireDate: formattedDate,
        // Convert numeric salary to string for form input
        salary: data.salary.toString(),
      });
    },
  });
  // State to store form data
  const [formData, setFormData] = isEditMode
    ? useState({ ...employeeData })
    : useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        salary: "",
        imageUrl: "",
        hireDate: "",
        status: "Active",
        address: "",
        emergencyContact: {
          name: "",
          relationship: "",
          phone: "",
        },
        skills: [],
        projects: [],
      });

  // Create employee mutation
  const createMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        title: "Success",
        description: "Employee created successfully",
      });
      navigate("/employees");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to create employee: ${error.message}`,
      });
    },
  });

  // Update employee mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee", id] });
      toast({
        title: "Success",
        description: "Employee updated successfully",
      });
      navigate(`/employees/${id}`);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update employee: ${error.message}`,
      });
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      // Handle nested objects like emergencyContact.name
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle skills input (comma-separated)
  const handleSkillsChange = (e) => {
    const skillsString = e.target.value;
    const skillsArray = skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    setFormData({
      ...formData,
      skills: skillsArray,
    });
  };

  // Handle projects input (comma-separated)
  const handleProjectsChange = (e) => {
    const projectsString = e.target.value;
    const projectsArray = projectsString
      .split(",")
      .map((project) => project.trim())
      .filter(Boolean);

    setFormData({
      ...formData,
      projects: projectsArray,
    });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    // Prepare submission data - convert string salary to number
    const submissionData = {
      ...formData,
      salary: parseFloat(formData.salary) || 0,
    };

    if (isEditMode) {
      updateMutation.mutate({ id, data: submissionData });
    } else {
      createMutation.mutate(submissionData);
    }
  };

  // Generate skills string for input field
  const skillsString = formData.skills ? formData.skills.join(", ") : "";

  // Generate projects string for input field
  const projectsString = formData.projects ? formData.projects.join(", ") : "";

  if (isEditMode && isLoadingEmployee) {
    return <div className="text-center py-4">Loading employee data...</div>;
  }

  // ---------------------------------------
  const uploadMutation = useMutation({
    mutationFn: (fileToUpload) => uploadImage(fileToUpload),
    onSuccess: (imgLink) => {
      setFormData({ ...formData, imageUrl: imgLink });
      // toast({
      //   description: "Image has been uploaded.",
      // });
    },
    onError: (err) => {
      console.log("errro happens during uploading");
      // toast({
      //   variant: "destructive",
      //   description: "Uploading failed. Try again later.",
      // });
    },
  });

  const handleFileUpload = async (event) => {
    const uploadFile = event.target.files[0];
    console.log(event.target.files);
    if (!uploadFile) return;

    // Check if the file is an image
    if (!uploadFile.type.match("image.*")) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update employee: ${error.message}`,
      });
      return;
    }

    console.log("check");

    // setfile(uploadFile);

    uploadMutation.mutate(uploadFile);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  // ---------------------------------------

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigate(isEditMode ? `/employees/${id}` : "/employees")
            }
            className="mr-4 p-0"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div>
            <CardTitle>
              {isEditMode ? "Edit Employee" : "Add New Employee"}
            </CardTitle>
            <CardDescription>
              {isEditMode
                ? "Update employee information"
                : "Fill in the details to add a new employee"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      {/* Image Upload Avtar */}

      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* <h1>{{ Loading: uploadMutation.isPending }}</h1> */}
          <Avatar
            className="w-32 h-32 border-4 border-gray-200 cursor-pointer"
            onClick={handleButtonClick}
          >
            {uploadMutation.isPending ? (
              <div className="flex items-center justify-center w-full h-full bg-gray-100">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            ) : formData.imageUrl ? (
              <AvatarImage
                src={formData.imageUrl}
                alt="Profile picture"
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="bg-gray-100 text-gray-400">
                <User className="w-12 h-12" />
              </AvatarFallback>
            )}
          </Avatar>

          <div className="absolute bottom-0 right-0">
            <Button
              size="sm"
              className="rounded-full w-8 h-8 p-0 bg-primary shadow-lg"
              onClick={handleButtonClick}
              disabled={uploadMutation.isLoading}
            >
              <Upload className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
        {uploadMutation.isError && (
          <p className="text-red-500 text-sm">{uploadMutation.error.message}</p>
        )}
        <p className="text-sm text-gray-500">
          Click to upload your profile picture
        </p>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Work Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Work Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="position" className="text-sm font-medium">
                  Position <span className="text-red-500">*</span>
                </label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium">
                  Department <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    handleSelectChange("department", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="salary" className="text-sm font-medium">
                  Annual Salary
                </label>
                <Input
                  id="salary"
                  name="salary"
                  type="number"
                  min="0"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="hireDate" className="text-sm font-medium">
                  Hire Date
                </label>
                <Input
                  id="hireDate"
                  name="hireDate"
                  type="date"
                  value={formData.hireDate}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Skills & Projects Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Skills & Projects</h3>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="skills" className="text-sm font-medium">
                  Skills (comma-separated)
                </label>
                <Input
                  id="skills"
                  name="skills"
                  value={skillsString}
                  onChange={handleSkillsChange}
                  placeholder="React, JavaScript, CSS, etc."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="projects" className="text-sm font-medium">
                  Projects (comma-separated)
                </label>
                <Input
                  id="projects"
                  name="projects"
                  value={projectsString}
                  onChange={handleProjectsChange}
                  placeholder="Project A, Project B, etc."
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Emergency Contact</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="emergencyContact.name"
                  className="text-sm font-medium"
                >
                  Name
                </label>
                <Input
                  id="emergencyContact.name"
                  name="emergencyContact.name"
                  value={formData.emergencyContact?.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="emergencyContact.relationship"
                  className="text-sm font-medium"
                >
                  Relationship
                </label>
                <Input
                  id="emergencyContact.relationship"
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact?.relationship}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="emergencyContact.phone"
                  className="text-sm font-medium"
                >
                  Phone
                </label>
                <Input
                  id="emergencyContact.phone"
                  name="emergencyContact.phone"
                  value={formData.emergencyContact?.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              navigate(isEditMode ? `/employees/${id}` : "/employees")
            }
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
            className="flex items-center"
          >
            <Save className="mr-2 h-4 w-4" />
            {isEditMode ? "Update Employee" : "Create Employee"}
            {(createMutation.isPending || updateMutation.isPending) && "..."}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EmployeeForm;
