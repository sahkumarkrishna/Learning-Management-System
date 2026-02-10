import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/Features/api/purchaseApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Loader2 } from "lucide-react";

const Dashboard = () => {
  const { data, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }
  if (isError) return <h1 className="text-red-500">Failed to get purchased course</h1>;

  const purchasedCourse = data?.purchasedCourse || [];
  if (!Array.isArray(purchasedCourse)) {
    return <h1 className="text-red-500">Invalid data received</h1>;
  }

  const courseData = purchasedCourse.map((course) => ({
    name: course?.courseId?.courseTitle || "Unknown Course",
    price: course?.courseId?.coursePrice || 0,
  }));

  const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element?.amount || 0), 0);
  const totalSales = purchasedCourse.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">Track your course performance and revenue</p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Sales</CardTitle>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">{totalSales}</p>
            <p className="text-xs text-gray-600 mt-2">Total courses sold</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Revenue</CardTitle>
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-2">Total earnings</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Avg. Revenue</CardTitle>
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">
              ₹{totalSales > 0 ? Math.round(totalRevenue / totalSales).toLocaleString() : 0}
            </p>
            <p className="text-xs text-gray-600 mt-2">Per course sale</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Course Price Analytics</CardTitle>
          <p className="text-sm text-gray-600">Visual representation of course pricing</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={courseData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" angle={-30} textAnchor="end" height={100} />
              <YAxis stroke="#6b7280" />
              <Tooltip
                formatter={(value) => [`₹${value}`, "Price"]}
                contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px" }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
