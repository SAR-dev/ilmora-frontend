import ClassCardMin from "components/ClassCardMin";
import NavLayout from "layouts/NavLayout"
import { MdOutlineNotificationsActive } from "react-icons/md";
import { RiMastodonLine } from "react-icons/ri";
import { PiStudentDuotone } from "react-icons/pi";
import StudentCardMin from "components/StudentCardMin";
import { IoIosStats } from "react-icons/io";
import StatCardMin from "components/StatCardMin";
import { BsFillHddStackFill } from "react-icons/bs";
import Card from "components/Card";
import { IoOptions } from "react-icons/io5";
import { Link } from "react-router";
import { FaRegCalendarPlus, FaRegCalendarAlt, FaExpand } from "react-icons/fa";
import { TbTableDashed } from "react-icons/tb";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useLocalStorage } from "usehooks-ts";
import { constants } from "constants";
import { useEffect, useMemo, useState } from "react";
import { addDays, api, dateViewFormatter, getDateInYYYYMMDD, getLocalTimezoneInfo } from "helpers";
import NoticeCard from "components/NoticeCard";
import { ClassLogDataType, ClassStatDataType, NoticeShortDataType, StudentDataType } from "types/response";
import { pb } from "contexts/PocketContext";
import { Collections, ResourcesResponse } from "types/pocketbase";
import ResourceCardMin from "components/ResourceCardMin";
import { BsCalendar2Week } from "react-icons/bs";

const today = new Date()
const yesterday = new Date(new Date().setDate(today.getDate() - 1))
const tomorrow = new Date(new Date().setDate(today.getDate() + 1))

const TeacherHome = () => {
  const [classesFetched, setClassesFetched] = useState(false)
  const [statsFetched, setStatsFetched] = useState(false)

  const [NoticeCardList, setNoticeCardList] = useLocalStorage<NoticeShortDataType[]>(constants.NOTICE_LIST_KEY, [])
  const [studentRoutineList, setStudentRoutineList] = useLocalStorage<StudentDataType[]>(constants.STUDENT_LIST_DATA_KEY, [])
  const [resourceList, setResourceList] = useLocalStorage<ResourcesResponse[]>(constants.RESOURCE_LIST_DATA_KEY, [])

  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const [classLogs, setClassLogs] = useState<ClassLogDataType[]>([])
  const [classFetching, setClassFetching] = useState(false)

  const [statYear, setStatYear] = useState<number>(today.getFullYear())
  const [statMonth, setStatMonth] = useState<number>(today.getMonth())
  const [classStat, setClassStat] = useState<ClassStatDataType | null>(null)

  const dataFetched = useMemo(() => statsFetched && classesFetched, [statsFetched, classesFetched])

  const classLogTitle = useMemo(() => {
    if(selectedDate.toDateString() == today.toDateString()) return "Today's Class Logs"
    if(selectedDate.toDateString() == yesterday.toDateString()) return "Yesterday's Class Logs"
    if(selectedDate.toDateString() == tomorrow.toDateString()) return "Tomorrow's Class Logs"
    return `Class Log - ${dateViewFormatter.format(selectedDate)}`
  }, [selectedDate])

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
      .finally(() => {
        setClassFetching(false)
        setClassesFetched(true)
      })
  }, [selectedDate])

  useEffect(() => {
    api.
      post("/api/t/classes/stats", {
        utcOffset: getLocalTimezoneInfo().offset,
        year: statYear,
        month: statMonth
      })
      .then(res => setClassStat(res.data))
      .catch(() => setClassStat(null))
      .finally(() => setStatsFetched(true))
  }, [statYear, statMonth])

  useEffect(() => {
    if (!dataFetched) return;
    api
      .get("/api/t/notices")
      .then(res => setNoticeCardList(res.data))
  }, [dataFetched])

  useEffect(() => {
    if (!dataFetched) return;
    api
      .get("/api/t/students")
      .then(res => setStudentRoutineList([...res.data]))
  }, [dataFetched])

  useEffect(() => {
    if (!dataFetched) return;
    pb
      .collection(Collections.Resources)
      .getFullList({
        sort: "-created",
        filter: `userType = 'TEACHER'`
      })
      .then(res => {
        setResourceList(res)
      })
  }, [dataFetched])

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
                headerTitle={classLogTitle}
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
                {studentRoutineList.map((data, i) => (
                  <StudentCardMin data={data} key={i} />
                ))}
                {studentRoutineList.length == 0 && (
                  <div className="px-5 py-3">No classes found</div>
                )}
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
                    <select
                      className="select select-sm select-bordered w-20"
                      value={statYear}
                      onChange={e => setStatYear(Number(e.target.value))}
                    >
                      {[...Array(10)].map((_, i) => (
                        <option value={today.getFullYear() - 2 + i} key={i}>{today.getFullYear() - 2 + i}</option>
                      ))}
                    </select>
                    <select
                      className="select select-sm select-bordered w-28"
                      value={statMonth}
                      onChange={e => setStatMonth(Number(e.target.value))}
                    >
                      {[...Array(12)].map((_, i) => (
                        <option value={i} key={i}>{constants.MONTHS[i]}</option>
                      ))}
                    </select>
                  </div>
                }
              >
                <StatCardMin data={classStat} />
              </Card>

              <Card
                headerIcon={<BsFillHddStackFill className="size-5" />}
                headerTitle="Resources"
              >
                {resourceList.map((data, i) => (
                  <ResourceCardMin data={data} key={i} />
                ))}
                {resourceList.length == 0 && (
                  <div className="px-5 py-3">No resources found</div>
                )}
              </Card>

              <Card
                headerIcon={<IoOptions className="size-5" />}
                headerTitle="Options"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5">
                <Link to="/t/classes/table" className="btn justify-start sm:justify-center">
                    <TbTableDashed className="size-4" />
                    Class Table
                  </Link>
                  <Link to="/t/classes/calendar" className="btn justify-start sm:justify-center">
                    <BsCalendar2Week className="size-4" />
                    Class Calendar
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