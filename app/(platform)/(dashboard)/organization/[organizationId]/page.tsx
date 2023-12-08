import { OrganizationSwitcher, auth } from "@clerk/nextjs";

"use client";
const OrganizationIdPage = () => {
  console.log("I am run in the browser");
  return (
    <div>
      <form>
        <input
          id="title"
          name="title"
          placeholder="Enter a Board Name"
          className="border-black border p-1"
          required
        />
      </form>
      {/* <OrganizationSwitcher hidePersonal /> */}
    </div>
  );
};

export default OrganizationIdPage;
