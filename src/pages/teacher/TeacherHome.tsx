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
import { IoOptions } from "react-icons/io5";
import { Link } from "react-router";
import { FaRegCalendarPlus, FaRegCalendarAlt } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { TbTableDashed } from "react-icons/tb";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const TeacherHome = () => {
  return (
    <NavLayout>
      <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-10">
              <Card
                headerIcon={<MdOutlineNotificationsActive className="size-5" />}
                headerTitle="Notifications"
              >
                <Notice />
                <Notice />
              </Card>

              <Card
                headerIcon={<RiMastodonLine className="size-5" />}
                headerTitle="Today's Class List"
                headerInfo={
                  <div className="flex gap-2 items-end">
                    <button className="btn btn-sm btn-square">
                      <FaArrowLeftLong className='size-4' />
                    </button>
                    <button className="btn btn-sm btn-square">
                      <FaArrowRightLong className='size-4' />
                    </button>
                  </div>
                }
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
            </div>
          </div>

          <div className="w-auto lg:w-96">
            <div className="grid grid-cols-1 gap-10 sticky top-0">
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

              <Card
                headerIcon={<IoOptions className="size-5" />}
                headerTitle="Options"
              >
                <div className="flex flex-row gap-5 px-5 py-2">
                  <Link to="/t/routines" className="btn flex-1">
                    <FaRegCalendarAlt className="size-4" />
                    View Routines
                  </Link>
                  <Link to="/t/routines/create" className="btn flex-1">
                    <FaRegCalendarPlus className="size-4" />
                    Create Routine
                  </Link>
                </div>
                <div className="flex flex-row gap-5 px-5 py-2">
                  <Link to="/t/classes" className="btn flex-1">
                    <SiGoogleclassroom className="size-4" />
                    View Classes
                  </Link>
                  <Link to="/t/classes/create" className="btn flex-1">
                    <TbTableDashed className="size-4" />
                    Create Class
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </NavLayout>
  )
}

export default TeacherHome