export default function ExamDetail({ params }: { params: { subject: string } }) {
    return (
        <>
            <h1>{decodeURI(params.subject)}</h1>
        </>
    )
}