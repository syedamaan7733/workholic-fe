import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  ArrowLeft,
  FileEdit,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  MapPin,
  UserCog,
  Briefcase,
  Loader2,
} from "lucide-react";

import { getEmployeeById } from "../services/employeeService";

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: employee,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployeeById(id),
  });

  if (isLoading) {
    return (
      <div className="text-center py-4 h-screen flex flex-col justify-center items-center">
        <Loader2 size={'45px'} className="animate-spin" />
        <h2>Loading please wait...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            <p>Error: {error.message}</p>
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/employees")}
              className="mt-4"
            >
              Back to Employees
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Status badge color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800";
      case "Terminated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/dashboard/employees")}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
        </Button>

        <Button
          onClick={() => navigate(`/dashboard/employees/${id}/edit`)}
          className="flex items-center"
        >
          <FileEdit className="mr-2 h-4 w-4" /> Edit Employee
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <img
                src={employee.imageUrl}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />
            </div>
            <div>
              <div className="flex items-center mb-2">
                <CardTitle className="text-2xl mr-3">
                  {employee.firstName} {employee.lastName}
                </CardTitle>
                <Badge className={getStatusColor(employee.status)}>
                  {employee.status}
                </Badge>
              </div>
              <CardDescription className="text-lg">
                {employee.position}
              </CardDescription>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> {employee.email}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" /> {employee.phone}
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" /> {employee.department}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <Tabs defaultValue="profile">
          <CardContent className="pb-0">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
            </TabsList>
          </CardContent>

          <TabsContent value="profile" className="m-0">
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Address</div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-1 text-gray-400" />
                      <span>{employee.address}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Hire Date</div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{formatDate(employee.hireDate)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Emergency Contact</h3>
                {employee.emergencyContact && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Name</div>
                      <div>{employee.emergencyContact.name}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Relationship</div>
                      <div>{employee.emergencyContact.relationship}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{employee.emergencyContact.phone}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="financial" className="m-0">
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Compensation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Annual Salary</div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-xl font-semibold">
                        {formatSalary(employee.salary)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="work" className="m-0">
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Current Projects</h3>
                <ul className="list-disc list-inside space-y-1">
                  {employee.projects.map((project) => (
                    <li key={project}>{project}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default EmployeeDetail;
