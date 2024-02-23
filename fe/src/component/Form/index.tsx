import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TValue = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
};

export default function Form() {
  const formSchema = z.object({
    firstName: z
      .string()
      .trim()
      .min(5, "Min length is 1")
      .max(100, "Max length is 100"),
    lastName: z
      .string()
      .trim()
      .min(5, "Min length is 1")
      .max(100, "Max length is 100"),
    email: z.string().email("You must input a valid email address"),
    phoneNumber: z.string().refine((value) => {
      const phoneNumberRegex: RegExp = /^\d{10}$/;
      return phoneNumberRegex.test(value);
    }, "Invalid phone number format"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: TValue) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center bg-gray-300 h-screen">
      <div className="w-1/2 m-10 bg-white h-fit p-10 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label htmlFor="firstName">First name</label>
            <input
              className="outline-blue-300 border mb-2"
              type="text"
              id="firstName"
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className="text-red-500">FirstName has error</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last name</label>
            <input
              className="outline-blue-300 border mb-2"
              type="text"
              id="lastName"
              {...register("lastName")}
            />
            {errors.lastName && (
              <span className="text-red-500">LastName has error</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="outline-blue-300 border mb-2"
              type="text"
              id="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500">Email has error</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              className="outline-blue-300 border mb-2"
              type="text"
              id="phoneNumber"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <span className="text-red-500">
                Phone Number must be number and has lenght is 10
              </span>
            )}
          </div>
          <button
            className="p-2 bg-blue-500 hover:bg-blue-300 text-white font-bold rounded-md"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
