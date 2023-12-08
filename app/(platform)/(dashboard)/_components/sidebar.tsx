"use client";
interface SidebarProps {
  storageKey?: string;
}
import { Organization } from "./nav-item";
import Link from "next/link";
import { Expand, Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Skeleton } from "@/components/ui/skeleton";

import { Accordion } from "@/components/ui/accordion";
import { access } from "fs";
import { NavItem } from "./nav-item";
// storage key will be used inside our accordion
//accordion can be extented and collapse
//by allowing to check local storage to see what was openned and what was not
export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  //alias
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  //turning object into array of active orgs like {"orgs":123} => ["123"] it is done for the accordion component to accept
  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );
  //takes org id for expanded accordion
  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id], //opposite conditon if true it will be false and if false it will be true
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Work Spaces</span>
        <Button
          asChild
          type="button"
          size={"icon"}
          variant={"ghost"}
          className="ml-auto"
        >
          <Link href={"/select-org"}>
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data?.map(({ organization }) => (
          // <p key={organization.id}>{organization.id}</p>
          <NavItem
            key={organization.id}
            //check active is current organization
            isActive={activeOrganization?.id === organization.id}
            //if organization is inside the expanded list
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};
