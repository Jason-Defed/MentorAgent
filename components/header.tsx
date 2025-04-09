"use client";

import Link from "next/link"
import { BookOpenIcon } from "lucide-react"
import { RoleSwitcher } from "@/components/role-switcher"
import { Button } from "@/components/ui/button"
import LoginButton from "../components/LoginButton";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { formatAddress } from "@/utils/util";
import { WalletDropdown } from "@/components/WalletDropdown";
import { useRouter } from "next/navigation"




interface DecodedToken {
  user_id: number;
  eth_address: string;
  edu_username: string;
  iss: string;
  iat: number;
  exp: number;
  aud: string;
  [key: string]: any;
}



interface HeaderProps {
  showRoleSwitcher?: boolean
}

export function Header({ showRoleSwitcher = true }: HeaderProps) {
  const { authState, ocAuth, OCId, ethAddress } = useOCAuth();
  let userInfo: DecodedToken | null = null;
  const router = useRouter()


  if (authState?.idToken) {
    userInfo = jwtDecode<DecodedToken>(authState.idToken);
  }


  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <BookOpenIcon className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold">MentorAgent</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {showRoleSwitcher && <RoleSwitcher />}

          {userInfo ? (
            <WalletDropdown
              address={userInfo.eth_address}
              onDisconnect={() => {
                console.log("Disconnected");
                ocAuth.logout(window.location.origin);
                router.push("/")
              }}
            />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  )
}
