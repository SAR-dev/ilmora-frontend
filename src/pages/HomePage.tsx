import ClassCardMin from "components/ClassCardMin";
import Notice from "components/Notice";
import NavLayout from "layouts/NavLayout"
import { MdOutlineNotificationsActive } from "react-icons/md";
import { RiMastodonLine } from "react-icons/ri";

const HomePage = () => {
  return (
    <NavLayout>
      <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
        <div className="grid grid-cols-1 gap-10">
          <div className="card divide-y divide-base-300 border border-base-300">
            <div className="p-5 w-full">
              <div className="flex items-center gap-2">
                <MdOutlineNotificationsActive className="size-5" />
                Notifications
              </div>
            </div>
            <Notice />
          </div>
          <div className="card divide-y divide-base-300 border border-base-300">
            <div className="p-5 w-full">
              <div className="flex items-center gap-2">
                <RiMastodonLine className="size-5" />
                Today's Class List
              </div>
            </div>
            <ClassCardMin />
            <ClassCardMin />
            <ClassCardMin />
          </div>
          <div>
            <div>Teacher Info</div>
            <hr />
          </div>
          <div>
            <div>Class Stats</div>
            <hr />
          </div>
          <div>
            <div>Options</div>
            <div>Student List</div>
            <div>Routine List</div>
            <div>Class List</div>
            <hr />
          </div>
        </div>
      </div>
    </NavLayout>
  )
}

export default HomePage