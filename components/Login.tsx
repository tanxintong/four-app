import { NotAccountType } from "@/types/global";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "@/actions/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	email: z.email({ message: "Please enter a valid email." }),
	password: z.string().min(6, "Password must be at least 6 characters."),
});
export default function Login({
	setNotAccountType,
}: {
	setNotAccountType: Dispatch<SetStateAction<NotAccountType>>;
}) {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// console.log(values); //搜集的数据
		const res = await loginAction(values.email, values.password);
		toast(res.body, {
			position: "top-center",
			duration: 2000,
			style: {
				backgroundColor: res.status === 200 ? "#d4edda" : "#f8d7da",
				color: res.status === 200 ? "#155724" : "#721c24",
			},
		});
		if (res.status === 200) {
			router.refresh();
		}
	}
	return (
		<div className="container2 my-20">
			<h1 className="text-xl mb-3 text-center font-bold">Welcome back</h1>
			<p className="text-center mb-6">Sign in to access an enhanced shopping experience.</p>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Please enter your email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Please enter your password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="w-full" type="submit">
						Sign in
					</Button>
				</form>
			</Form>
			<p className="text-center text-sm mt-3">
				Not a member?
				<span
					className="underline text-orange-50-400 cursor-pointer ml-2"
					onClick={() => setNotAccountType("register")}
				>
					Join us
				</span>
			</p>
		</div>
	);
}
