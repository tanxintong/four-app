"use client";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { NotAccountType } from "@/types/global";

export default function NotAccount() {
	const [notAcountType, setNotAccountType] = useState<NotAccountType>("login");
	return (
		<div>
			{notAcountType === "login" ? (
				<Login setNotAccountType={setNotAccountType} />
			) : (
				<Register setNotAccountType={setNotAccountType} />
			)}
		</div>
	);
}
