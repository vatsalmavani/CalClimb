export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center py-4 bg-foreground">
      <div className="text-sm text-background">
        &copy; {new Date().getFullYear()} CalClimb. All rights reserved.
      </div>
    </footer>
  );
}
