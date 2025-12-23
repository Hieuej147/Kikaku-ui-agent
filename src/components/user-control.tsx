"use client";
import { useCurrentTheme } from "@/hooks/use-current-theme";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

interface Props {
  showname?: boolean;
}
export const UserControl = ({ showname }: Props) => {
  const currentTheme = useCurrentTheme();
  return (
    <>
      <UserButton
        showName={showname}
        appearance={{
          elements: {
            userButtonBox: "rounded-md!",
            userButtonAvatarBox: "rounded-md! size-8!",
            userButtonTrigger: "rounded-md!",
          },
          baseTheme: currentTheme === "dark" ? dark : undefined,
        }}
      ></UserButton>
    </>
  );
};
