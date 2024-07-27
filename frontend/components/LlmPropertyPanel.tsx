
export default function LlmPropertyPanel() {
    let temperature = 0.8;
    return (
        <table>
            <tbody>
            <tr>
                <td>Temperature</td>
                <td><input value={temperature}/></td>
            </tr>
            </tbody>
        </table>
    )
}