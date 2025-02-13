import ClassCardMin from "components/ClassCardMin";
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
import { FaRegCalendarPlus, FaRegCalendarAlt, FaExpand } from "react-icons/fa";
import { TbTableDashed } from "react-icons/tb";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useLocalStorage } from "usehooks-ts";
import { constants } from "constants";
import { useEffect, useState } from "react";
import { addDays, api, dateViewFormatter, getDateInYYYYMMDD, getLocalTimezoneInfo } from "helpers";
import NoticeCard from "components/NoticeCard";
import { ClassLogDataType, NoticeShortDataType } from "types/response";

const today = new Date()

const TeacherHome = () => {
  const [NoticeCardList, setNoticeCardList] = useLocalStorage<NoticeShortDataType[]>(constants.NOTICE_LIST_KEY, [])

  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const [classLogs, setClassLogs] = useState<ClassLogDataType[]>([])
  const [classFetching, setClassFetching] = useState(false)

  useEffect(() => {
    api
      .get("/api/t/notices")
      .then(res => setNoticeCardList(res.data))
  }, [])

  useEffect(() => {
    setClassFetching(true)
    api
      .post("/api/t/classes/day", {
        utcOffset: getLocalTimezoneInfo().offset,
        date: getDateInYYYYMMDD(selectedDate),
        studentId: ""
      })
      .then((res) => setClassLogs(res.data))
      .catch(() => setClassLogs([]))
      .finally(() => setClassFetching(false))
  }, [selectedDate])


  return (
    <NavLayout>
      <div className="w-full max-w-screen-xl mx-auto px-5 my-5 lg:my-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-10">
              <Card
                headerIcon={<MdOutlineNotificationsActive className="size-5" />}
                headerTitle="Recent Notices"
                headerInfo={
                  <div className="tooltip tooltip-info" data-tip="Show more notices">
                    <Link to="/t/notices" className="btn btn-sm btn-square">
                      <FaExpand className="size-5" />
                    </Link>
                  </div>
                }
              >
                {NoticeCardList.map((data, i) => (
                  <NoticeCard data={data} key={i} />
                ))}
              </Card>

              <Card
                headerIcon={<RiMastodonLine className="size-5" />}
                headerTitle={`Class Log - ${dateViewFormatter.format(selectedDate)}`}
                headerInfo={
                  <div className="flex gap-2 items-end">
                    <button
                      className="btn btn-sm btn-square"
                      onClick={() => setSelectedDate(addDays(selectedDate.toDateString(), -1))}
                      disabled={classFetching}
                    >
                      <FaArrowLeftLong className='size-4' />
                    </button>
                    <button
                      className="btn btn-sm btn-square"
                      onClick={() => setSelectedDate(addDays(selectedDate.toDateString(), 1))}
                      disabled={classFetching}
                    >
                      <FaArrowRightLong className='size-4' />
                    </button>
                  </div>
                }
              >
                {classLogs.map((data, i) => (
                  <ClassCardMin data={data} key={i} />
                ))}
                {classLogs.length == 0 && (
                  <div className="px-5 py-3">No classes found</div>
                )}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5">
                  <Link to="/t/classes" className="btn justify-start sm:justify-center sm:col-span-2">
                    <TbTableDashed className="size-4" />
                    View Classes
                  </Link>
                  <Link to="/t/classes/create" className="btn justify-start sm:justify-center">
                    <FaRegCalendarPlus className="size-4" />
                    Create Class
                  </Link>
                  <Link to="/t/routines/create" className="btn justify-start sm:justify-center">
                    <FaRegCalendarAlt className="size-4" />
                    Create Routines
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