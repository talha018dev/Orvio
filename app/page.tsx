import PageContentWrapper from "@/components/PageContentWrapper";
import { MAIN_SERVICE_URL } from "@/config";
import { redirect } from "next/navigation";

export default function Home() {
  // const changeTheme = () => {
  //   const root = document.documentElement;
  //   const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  //   root.setAttribute("data-theme", newTheme);
  // }

  // redirect('/board')
  return null

  // return (
  //   <PageContentWrapper>
  //     <div className="mt-30">
  //       {MAIN_SERVICE_URL ?? 'Unknown'}
  //       {/* <div className="bg-primary text-sm"> bg-copy-primary</div>
  //     <Button variant={'default'} onClick={changeTheme}>Default</Button>
  //     <Button variant={'destructive'} onClick={changeTheme}>Destructive</Button>
  //     <Button variant={'outline'} onClick={changeTheme}>Outline</Button>
  //     <Button variant={'ghost'} onClick={changeTheme}>Ghost</Button>
  //     <Button variant={'link'} onClick={changeTheme}>Link</Button> */}
  //     </div>
  //   </PageContentWrapper>
  // )
}
