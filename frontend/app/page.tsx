import classes from "./page.module.css"
import ChatPanel from "@/components/ChatPanel";
import LlmPropertyPanel from "@/components/LlmPropertyPanel";

export default function Home() {
    return (
        <div>
            <header className={classes.header}>
                <h3>LLM Chat Server</h3>
            </header>
            <main className={classes.container}>
                <div className={classes.mainContent}>
                    <ChatPanel/>
                </div>
                <div className={classes.sidebar}>
                    <LlmPropertyPanel/>
                </div>

            </main>
        </div>
    );
}
