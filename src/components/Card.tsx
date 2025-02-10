import { ReactNode } from 'react';

const Card = ({
  headerIcon,
  headerTitle,
  headerInfo,
  children
}:{
  headerIcon: ReactNode
  headerTitle: string
  headerInfo?: ReactNode
  children: ReactNode | ReactNode[]
}) => {
  return (
    <div className="card divide-y divide-base-300 border border-base-300 bg-base-100">
      <div className="p-5 w-full flex justify-between items-center bg-info/20">
        <div className="flex items-center gap-2 font-semibold text-info">
          {headerIcon}
          {headerTitle}
        </div>
        {headerInfo}
      </div>
      {children}
    </div>
  )
}

export default Card