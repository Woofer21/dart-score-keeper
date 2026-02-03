import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "@/styles/global.css";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";

const notoSans = Noto_Sans({ variable: "--font-sans" });

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Dart Score Keeper",
	description: "Quick and easy way to keep track of your dart scores"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={notoSans.variable}
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased dark min-h-[90vh]`}
			>
				<TooltipProvider>
					<nav className="flex flex-row items-center justify-around gap-2 p-2 border border-transparent border-b-border">
						<Link href={"/"}>
							<h1>Dart Score Keeper</h1>
						</Link>
						<div className="flex flex-row items-center gap-2">
							<Link href={"#"}>
								<Button variant={"ghost"}>Statistics</Button>
							</Link>
							{/* <Button
								variant={"ghost"}
								size={"icon"}
							>
								<MoonIcon className="size-4" />
							</Button> */}
						</div>
					</nav>
					{children}
					<footer className="flex flex-row items-center justify-around gap-2 p-2 border border-transparent border-t-border">
						<p>Made with ❤️</p>
					</footer>
				</TooltipProvider>
			</body>
		</html>
	);
}
