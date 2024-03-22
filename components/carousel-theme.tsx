const CarouselTheme = {
  indicators: {
    active: {
      off: "bg-foreground/30 backdrop-blur-md", // Specify class for inactive indicator
      on: "bg-primary", // Specify class for active indicator
    },
  },
  control: {
    base:
      "inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/30 backdrop-blur-md group-hover:bg-foreground/50 sm:h-7 sm:w-7", // Specify base class for the controls
    icon: "text-foreground hover:font-black", // Specify class for the control icons
  },
};
export default CarouselTheme;
