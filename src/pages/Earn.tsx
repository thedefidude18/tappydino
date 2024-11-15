import { ReferralTaskType, TaskType } from "@/types/TaskType";
import { useMemo, useState } from "react";
import TaskDrawer from "@/components/TaskDrawer";
import ListItem from "@/components/ListItem";
import Price from "@/components/Price";
import DailyDrawer from "@/components/DailyDrawer";
import CheckIcon from "@/components/icons/CheckIcon";
import { useQuery } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { cn } from "@/lib/utils";
import { uesStore } from "@/store";
import ReferralTaskDrawer from "@/components/ReferralTaskDrawer";
import levelConfig from "@/config/level-config";
import { useUserStore } from "@/store/user-store";

export default function Earn() {
  const { totalDailyRewards } = uesStore();
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [isDailyDrawerOpen, setIsDailyDrawerOpen] = useState(false);
  const [isReferralTaskDrawerOpen, setIsReferralTaskDrawerOpen] =
    useState(false);
  const [activeReferralTask, setActiveReferralTask] =
    useState<ReferralTaskType | null>(null);

  const user = useUserStore();

  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => $http.$get<TaskType[]>("/clicker/tasks"),
  });

  const referralTasks = useQuery({
    queryKey: ["referral-tasks"],
    queryFn: () => $http.$get<ReferralTaskType[]>("/clicker/referral-tasks"),
  });

  const videoTasks = useMemo(
    () => data?.filter((task) => task.type === "video") || [],
    [data]
  );

  const otherTasks = useMemo(
    () => data?.filter((task) => task.type === "other") || [],
    [data]
  );

  return (
    <div
      className="flex flex-col justify-end bg-cover flex-1"
      style={{
        background: 'linear-gradient(to bottom, #575EFF, rgba(14, 203, 255, 0.94))'
      }}
    >
      <div className="flex flex-col flex-1 w-full h-full px-6 py-8 pb-24 mt-12 modal-body">
        <img
          src="/images/bounty.png"
          alt="coins"
          className="object-contain w-32 h-32 mx-auto"
        />
        <h1
         style={{
         fontFamily: "'ZCOOL KuaiLe', sans-serif",
         fontSize: '1.5rem',
         textAlign: 'center',
         marginTop: '1rem',
         color: '#ffffff',
         }}
         >
         EARN DINOH FROM TASKS
         </h1>
        {videoTasks.length > 0 && (
          <>
            <h1
         style={{
         fontFamily: "'ZCOOL KuaiLe', sans-serif",
         fontSize: '1.0rem',
         textAlign: 'center',
         marginTop: '1rem',
         color: '#ffffff',
         }}
         >
         Dino Horizon Youtube
         </h1>
            <div className="mt-4 space-y-2">
            <div className="mt-4 space-y-2">
  {videoTasks.map((item) => (
    <div 
      key={item.id}
      className="rounded-lg p-2 flex items-center space-x-3" 
      style={{
        backgroundColor: '#FFFFFF',  // White background for each item
        borderRadius: '15px',
        padding: '0.2rem',  // Reduced padding for compactness
        boxShadow: '0 6px 0 #AC36A0, 0 8px 15px rgba(0, 0, 0, 0.2)',  // Magenta base effect
        position: 'relative',
        transform: 'translateY(-3px)',  // Slight lift for 3D effect
      }}
    >
      <img 
        src={item.image || "/images/youtube.png"} 
        alt={item.name} 
        className="w-10 h-10 rounded-full"  // Smaller image size for compact layout
      />
      
      <ListItem
        title={item.name}
        subtitle={<Price amount={`+${item.reward_coins.toLocaleString()}`} className="text-black" />}
        onClick={() => {
          setActiveTask(item);
          setIsTaskDrawerOpen(true);
        }}
        action={
          item.is_rewarded ? (
            <CheckIcon className="w-6 h-6 text-[#27D46C]" />
          ) : undefined
        }
        disabled={item.is_rewarded}
        className="flex-1 text-black font-semibold"  // Ensure all text inside ListItem is black
      />
    </div>
  ))}
</div>

            </div>
          </>
        )}
        <h1
         style={{
         fontFamily: "'ZCOOL KuaiLe', sans-serif",
         fontSize: '1.0rem',
         textAlign: 'center',
         marginTop: '1rem',
         color: '#ffffff',
         }}
         >
         Tappy Dino Daily Reward
         </h1>
        <div className="mt-4 space-y-2">
        <div 
  className="rounded-lg p-2 mb-4 flex items-center space-x-3" 
  style={{
    backgroundColor: '#FFFFFF',  // White container background
    borderRadius: '15px',
    padding: '0.2rem',  // Reduced padding to minimize height
    boxShadow: '0 6px 0 #AC36A0, 0 8px 15px rgba(0, 0, 0, 0.2)', // Magenta base for 3D effect
    position: 'relative',
    transform: 'translateY(-3px)',  // Slight lift to accentuate the 3D base
  }}
>
  <img 
    src="/images/daily-task.png" 
    alt="Daily Task" 
    className="w-10 h-10 rounded-full"  // Smaller image size
  />
  
  <ListItem
    title="Daily DINOH"
    subtitle={`+${Number(totalDailyRewards).toLocaleString()}`}
    onClick={() => setIsDailyDrawerOpen(true)}
    className="flex-1 text-black font-semibold"  // Styling for text with reduced padding
  />
</div>

        </div>
        {otherTasks.length > 0 && (
          <>
            <h1
         style={{
         fontFamily: "'ZCOOL KuaiLe', sans-serif",
         fontSize: '1.0rem',
         textAlign: 'center',
         marginTop: '1rem',
         color: '#ffffff',
         }}
         >
         All Tasks
         </h1>
            <div className="mt-4 space-y-2">
            <div className="mt-4 space-y-2">
  {otherTasks.map((item) => (
    <div 
      key={item.id}
      className="rounded-lg p-2 flex items-center space-x-3" 
      style={{
        backgroundColor: '#FFFFFF',  // White background for each item
        borderRadius: '15px',
        padding: '0.2rem',  // Reduced padding for compactness
        boxShadow: '0 6px 0 #AC36A0, 0 8px 15px rgba(0, 0, 0, 0.2)',  // Magenta base effect
        position: 'relative',
        transform: 'translateY(-3px)',  // Slight lift for 3D effect
      }}
    >
      <img 
        src={item.image || "/images/bounty.png"} 
        alt={item.name} 
        className="w-10 h-10 rounded-full"  // Smaller image size for compact layout
      />
      
      <ListItem
        title={item.name}
        subtitle={<Price amount={`+${item.reward_coins.toLocaleString()}`} className="text-black" />}
        className={cn("flex-1 text-black font-semibold", {
          "disabled:opacity-50 disabled:mix-blend-luminosity": item.is_rewarded,
        })}
        disabled={item.is_rewarded}
        action={
          item.is_rewarded ? (
            <CheckIcon className="w-6 h-6 text-[#27D46C]" />
          ) : undefined
        }
        onClick={() => {
          setActiveTask(item);
          setIsTaskDrawerOpen(true);
        }}
      />
    </div>
  ))}
</div>

            </div>
          </>
        )}
        {referralTasks.data && referralTasks.data?.length > 0 && (
          <>
            <h1
         style={{
         fontFamily: "'ZCOOL KuaiLe', sans-serif",
         fontSize: '1.0rem',
         textAlign: 'center',
         marginTop: '1rem',
         color: '#ffffff',
         }}
         >
         Refrral Tasks
         </h1>
            <div className="mt-4 space-y-2">
              {referralTasks.data.map((item) => (
                <ListItem
                  key={item.id}
                  title={item.title}
                  subtitle={
                    <Price amount={`+${item.reward.toLocaleString()}`} />
                  }
                  image={"/images/bounty.png"}
                  className={cn(
                    "disabled:opacity-50 disabled:mix-blend-luminosity"
                  )}
                  disabled={!!item.is_completed}
                  action={
                    item.is_completed ? (
                      <CheckIcon className="w-6 h-6 text-[#27D46C]" />
                    ) : undefined
                  }
                  onClick={() => {
                    setActiveReferralTask(item);
                    setIsReferralTaskDrawerOpen(true);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <DailyDrawer
        open={isDailyDrawerOpen}
        onOpenChange={setIsDailyDrawerOpen}
      />
      <TaskDrawer
        task={activeTask}
        open={isTaskDrawerOpen}
        onOpenChange={setIsTaskDrawerOpen}
      />
      <ReferralTaskDrawer
        task={activeReferralTask}
        open={isReferralTaskDrawerOpen}
        onOpenChange={setIsReferralTaskDrawerOpen}
      />
    </div>
  );
}
