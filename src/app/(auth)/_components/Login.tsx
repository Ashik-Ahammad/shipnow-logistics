"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <main className="flex min-h-screen flex-col desktop:flex-row">
      <div className="flex w-full flex-col items-center justify-center bg-[#856DF3] p-8 text-white desktop:w-1/2 desktop:p-16">
        <div className="mb-12 flex items-center gap-2 tablet:mb-16">
          <Image
            src="/images/shipnowBlackLogo.png"
            alt="ShipNow Logo Black"
            width={47}
            height={47}
            className="
            h-[31.3px] w-[31.3px]
            md:h-[46.96px] md:w-[46.96px]
            object-contain
            "
            priority
          />
          <span
            className="
              font-nunito
              text-[22.96px]
              font-black
              italic
              leading-[120%]
              uppercase
              md:text-[34.43px]
            "
          >
            SHIPNOW
          </span>
        </div>

        {/* FIXED WRAPPER: Size is exactly equal to the Main Large Image */}
        <div className="relative mx-auto mb-12 h-[229.05px] w-[243.24px] tablet:h-96.5 tablet:w-102.5">
  
          {/* Large Image (Main) - Perfectly centered with the text below */}
          <div className="absolute inset-0 overflow-hidden rounded-[7px] border-none shadow-none tablet:rounded-xl">
            <Image
              src="/images/loginImage1.png"
              alt="Fleet logistics"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Small Image (Overlay) - Sticks out slightly to the right and top */}
          <div className="absolute top-[-17.28px] left-[159.62px] h-[135.28px] w-[105.89px] overflow-hidden rounded-[5px] border-none shadow-none opacity-90 tablet:top-[-29.5px] tablet:left-67.5 tablet:h-57 tablet:w-[178.46px] tablet:rounded-lg">
            <Image
              src="/images/loginImage2.png"
              alt="Mobile tracking"
              fill
              className="object-cover"
              priority
            />
          </div>

        </div>

        <div className="text-center">
          <h1
            className="
          mb-4
          font-nunito
          text-[40px]
          font-extrabold
          leading-[110%]
          tracking-[0%]
        "
          >
            Welcome to ShipNow
          </h1>
          <p
            className="
            mx-auto
            max-w-md
            text-center
            font-nunito
            text-[16px]
            font-normal
            leading-[125%]
          "
          >
            Manage your shipments, fleet, and warehouse in one smart dashboard.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-white p-6 tablet:p-12 desktop:w-1/2 desktop:p-24">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <Image
              src="/images/shipnowBlueLogo.png"
              alt="ShipNow Logo"
              width={32}
              height={32}
              className="mb-6 h-8 w-auto object-contain"
              priority
            />
            <h2 className="mb-2 text-2xl font-bold text-gray-900 tablet:text-3xl">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 tablet:text-base">
              Log in to continue managing your logistics with ShipNow
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700 tablet:text-sm"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter a valid email address"
                {...register("email")}
                className={cn(
                  "w-full rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none border transition-all",
                  errors.email
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-transparent focus:border-[#8155FF] focus:ring-1 focus:ring-[#8155FF]",
                )}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-700 tablet:text-sm"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  {...register("password")}
                  className={cn(
                    "w-full rounded-lg bg-gray-50 px-4 py-3 pr-10 text-sm text-gray-900 outline-none border transition-all",
                    errors.password
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-transparent focus:border-[#8155FF] focus:ring-1 focus:ring-[#8155FF]",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 rounded-3xl border-gray-300 text-[#856DF3] focus:ring-[#856DF3]"
                />
                <span className="text-xs text-gray-600 tablet:text-sm">
                  Remember Me
                </span>
              </label>
              <a
                href="#"
                className="text-xs text-[#856DF3] hover:underline tablet:text-sm"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-lg bg-[#232323] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#232323] focus:ring-offset-2 tablet:text-base disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-500 tablet:text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="font-semibold text-[#856DF3] hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}