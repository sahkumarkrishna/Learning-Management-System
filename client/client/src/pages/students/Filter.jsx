import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data-science", label: "Data Science" },
  { id: "frontend-development", label: "Frontend Development" },
  { id: "fullstack-development", label: "Fullstack Development" },
  { id: "mern-stack-development", label: "MERN Stack Development" },
  { id: "backend-development", label: "Backend Development" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "java", label: "Java" },
  { id: "reactjs", label: "React JS" },
  { id: "angularjs", label: "Angular JS" },
  { id: "vuejs", label: "Vue JS" },
  { id: "nodejs", label: "Node JS" },
  { id: "spring-boot", label: "Spring Boot" },
  { id: "django", label: "Django" },
  { id: "sql", label: "SQL" },
  { id: "web-development", label: "Web Development" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];
      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
      </div>
      
      <div className="mb-6">
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Sort by Price</Label>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-6" />
      
      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Categories</Label>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-3">
              <Checkbox
                id={category.id}
                onCheckedChange={() => handleCategoryChange(category.id)}
                className="border-gray-300"
              />
              <Label
                htmlFor={category.id}
                className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;