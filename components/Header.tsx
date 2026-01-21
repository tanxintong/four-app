import Link from "next/link";
import { Separator } from "./ui/separator";
import { Title, MenuList } from "@/lib/constants";
import { Fragment } from "react";

export default async function Header() {
	return (
		<div className="h-16 px-10 border-b bg-white">
			<div className="container flex items-center justify-between h-full">
				<h1 className="text-2xl">
					<Link href="/">{Title}</Link>
				</h1>
				<div className="flex justify-end space-x-4 text-sm h-1/3">
					{MenuList.map((item, index) => (
						<Fragment key={item.text}>
							{index !== 0 && <Separator orientation="vertical" />}
							<Link href={item.href}>{item.text}</Link>
						</Fragment>
					))}
				</div>
			</div>
		</div>
	);
}
