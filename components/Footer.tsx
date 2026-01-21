import Link from "next/link";
import { Separator } from "./ui/separator";
import { Title, NavList } from "@/lib/constants";
import { Fragment } from "react";

export default async function Footer() {
	return (
		<div className="border-t mt-6">
			<div className="container py-32 flex justify-between">
				<h2 className="text-2xl">
					<Link href="/">{Title}</Link>
				</h2>
				<div className="flex gap-10">
					{NavList.map((item, index) => (
						<Fragment key={item.title}>
							{index !== 0 && <Separator orientation="vertical" />}
							<div>
								<span>{item.title}</span>
								<ul className="m-4 space-y-3">
									{item.list.map((listitem) => (
										<li key={listitem}>{listitem}</li>
									))}
								</ul>
							</div>
						</Fragment>
					))}
				</div>
			</div>
		</div>
	);
}
