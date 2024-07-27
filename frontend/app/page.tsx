import Image from "next/image";

export default function Home() {
    let temperature = 0.8;
    return (
        <main className="container">
            <div className="main-content">
                <div className="history">History</div>
                <div>
                    <input placeholder="Your question here ..."/>
                </div>
            </div>
            <div className="sidebar">
                <table>
                    <tbody>
                    <tr>
                        <td>Temperature</td>
                        <td><input value={temperature}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </main>
    );
}
