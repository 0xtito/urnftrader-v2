import DashboardLayout from "../../layouts/DashboardLayout";

export default function MainApp() {
  return (
    <DashboardLayout page={"Collections"}>
      {/* placeholder */}
      <div className="py-4">
        <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
      </div>
    </DashboardLayout>
  );
}