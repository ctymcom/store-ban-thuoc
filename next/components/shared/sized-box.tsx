export function SizedBox({ w, h, children }: { w?: string, h?:string, children?: any }) {
    return <div className={(w && `w-${w}`) + " " + (h && `h-${h}`)}>{children}</div>
}