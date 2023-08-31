import problem from "../assets/photos/workflow-status-problem.svg";

function ErrorMessage({ errorMessage }: { errorMessage: string | undefined }) {
  if (!errorMessage) return null;
  return (
    <div className="flex w-full gap-2 flex-row-reverse">
      <img src={problem} />
      <p className="text-red-500 text-xs">{errorMessage}</p>
    </div>
  );
}

export default ErrorMessage;
