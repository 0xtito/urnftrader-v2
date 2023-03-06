import { MainAppLayout } from "../../layouts";

export default function MainApp() {
  return (
    <MainAppLayout
      sideBarJSX={
        <div className="h-full rounded-lg border-2 border-dashed border-gray-200" />
      }
    >
      {/* placeholder */}
      <div className="py-4">
        <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
      </div>
    </MainAppLayout>
  );
}
