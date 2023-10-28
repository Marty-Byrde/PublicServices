import { cookies } from "next/headers"
import { setCookie } from "nookies"


export function getColorMode(){
  const cookie = (name: string) => {
    const { _parsed: mappedCookies } = cookies() as any
    if (!mappedCookies.has(name)) return undefined;

    return mappedCookies.get(name).value
  }

  return cookie("colorMode")
}

export function useColorModeValue(light: any, dark: any){
  const mode = getColorMode();

  if(mode === "light") return light;

  return dark;
}

export function toggleColorMode(){
  const mode = getColorMode()
  setCookie(null, "colorMode", mode === "dark" ? "light" : "dark")
}