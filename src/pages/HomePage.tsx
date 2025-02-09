import ClassCardMin from "components/ClassCardMin";
import Notice from "components/Notice";
import NavLayout from "layouts/NavLayout"
import { MdOutlineNotificationsActive } from "react-icons/md";
import { RiMastodonLine } from "react-icons/ri";
import { PiStudentDuotone } from "react-icons/pi";
import StudentCardMin from "components/StudentCardMin";
import { IoIosStats } from "react-icons/io";
import StatCardMin from "components/StatCardMin";
import { BsFillHddStackFill } from "react-icons/bs";
import ResourceCardMin from "components/ResourceCardMin";
import Card from "components/Card";

const HomePage = () => {
  return (
    <NavLayout>
      <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
        <div className="grid grid-cols-1 gap-10">
          <Card
            headerIcon={<MdOutlineNotificationsActive className="size-5" />}
            headerTitle="Notifications"
          >
            <Notice />
          </Card>

          <Card
            headerIcon={<RiMastodonLine className="size-5" />}
            headerTitle="Today's Class List"
          >
            <ClassCardMin />
            <ClassCardMin />
            <ClassCardMin />
          </Card>

          <Card
            headerIcon={<PiStudentDuotone className="size-5" />}
            headerTitle="Student List"
          >
            <StudentCardMin />
            <StudentCardMin />
            <StudentCardMin />
            <StudentCardMin />
          </Card>

          <Card
            headerIcon={<IoIosStats className="size-5" />}
            headerTitle="Class Stats"
            headerInfo={
              <div className="flex gap-2">
                <select className="select select-sm select-bordered w-full max-w-xs">
                  <option disabled selected>Year</option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
                <select className="select select-sm select-bordered w-full max-w-xs">
                  <option disabled selected>Month</option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
              </div>
            }
          >
            <StatCardMin />
          </Card>

          <Card
            headerIcon={<BsFillHddStackFill className="size-5" />}
            headerTitle="Resources"
          >
            <ResourceCardMin />
            <ResourceCardMin />
            <ResourceCardMin />
            <ResourceCardMin />
          </Card>
          
          <div>
            <div>Options</div>
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