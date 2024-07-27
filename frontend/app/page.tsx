import Image from "next/image";
import classes from "./page.module.css"
import ChatPanel from "@/components/ChatPanel";
import LlmPropertyPanel from "@/components/LlmPropertyPanel";

export default function Home() {

    return (
        <main className={classes.container}>
            <div className={classes.mainContent}>
                <ChatPanel/>
            </div>
            <div className={classes.sidebar}>
                <LlmPropertyPanel />
            </div>

        </main>
    );
}
