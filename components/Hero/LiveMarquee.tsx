import { sanityClient } from "@/sanity-client";

type UpdateProps = {
  titre: string;
  datetime: string;
};

const getLives = async () => {
  try {
    const lives = await sanityClient.fetch(`
      *[_type == 'live'] | order(datetime desc) {
        titre,
        datetime,
      }
    `, {},  {next : { revalidate: 0 }});
    return lives;
  } catch (error) {
    console.error("Error fetching live:", error);
  }
};
export default async function LiveMarquee () {
  const updates: UpdateProps[] = await getLives();

  return (
    <div className="w-full rounded-lg bg-muted/40">
      <div className="overflow-hidden">
        <div className="container px-4">
          <div className="flex items-center space-x-4 py-4">
            <div className="w-full  space-y-2">
              <div className="flex items-center space-x-2 text-xs">
                <SignalIcon className="animate-pulse h-4 w-4 rounded-full bg-red-500" />
                <span className="font-bold">LIVE</span>
                <span className="opacity-70">|</span>
                <time className="opacity-70" dateTime={updates[0].datetime}>
                  {timeSince(updates[0].datetime)}
                </time>
              </div>
              <div className="text-sm w-fit font-medium leading-none overflow-hidden whitespace-nowrap marquee flex justify-between">
                {updates.map((update, index) => (
                  <div key={index} className="flex ">
                    {/* add more space */}
                    <p>{" - "}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p>{update.titre}</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></svg>
  );
}

// Function to calculate time since a given date
function timeSince(date: string) {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}
