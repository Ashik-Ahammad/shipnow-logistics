import { Box } from "lucide-react";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F3FF]">
          <Box className="h-10 w-10 text-[#856DF3]" />
        </div>
        <h1 className="mb-3 text-[28px] font-bold text-[#333333] leading-tight">
          {title} <br/> Coming Soon
        </h1>
        <p className="text-[15px] text-[#757575] leading-relaxed">
          We&apos;re currently working hard to bring you the new {title} module. Check back later for updates!
        </p>
      </div>
    </div>
  );
}
