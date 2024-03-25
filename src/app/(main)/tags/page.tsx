import TagsTable from "@/app/(main)/tags/_components/tags-table";
import { columns } from "@/app/(main)/tags/_components/tags-columns";
import { viewTags } from "@/app/(main)/tags/_components/actions/tags.action";
const Tags = async () => {
  const tags = await viewTags();
  return (
    <>
      <TagsTable columns={columns} data={tags} />
    </>
  );
};
export default Tags;
