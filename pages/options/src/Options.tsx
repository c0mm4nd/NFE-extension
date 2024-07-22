import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
import { ComponentPropsWithoutRef } from 'react';
import { Button } from '@workspace/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@workspace/components/ui/card';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@workspace/components/ui/input';
import { Label } from '@workspace/components/ui/label';
import { Switch } from '@workspace/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@workspace/components/ui/select';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@workspace/components/ui/form';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Non-Fungible Enthusiast Extension Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Choose what you want to be notified about.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="new-listings" className="text-sm font-medium leading-none">
                    New Listings
                  </Label>
                  <p className="text-sm text-muted-foreground">Get notified when new NFTs are listed.</p>
                </div>
                <Switch id="new-listings" className="ml-auto" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="price-changes" className="text-sm font-medium leading-none">
                    Price Changes
                  </Label>
                  <p className="text-sm text-muted-foreground">Get notified when prices change.</p>
                </div>
                <Switch id="price-changes" className="ml-auto" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="market-trends" className="text-sm font-medium leading-none">
                    Market Trends
                  </Label>
                  <p className="text-sm text-muted-foreground">Get notified about market trends.</p>
                </div>
                <Switch id="market-trends" className="ml-auto" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommendation Algorithm</CardTitle>
            <CardDescription>Adjust the recommendation algorithm to better suit your interests.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="preferred-artists" className="text-sm font-medium leading-none">
                    Preferred Artists
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Prioritize recommendations from your favorite artists.
                  </p>
                </div>
                <Select>
                  <SelectTrigger id="preferred-artists" className="w-40">
                    <SelectValue placeholder="Select artists" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="artist1">Artist 1</SelectItem>
                    <SelectItem value="artist2">Artist 2</SelectItem>
                    <SelectItem value="artist3">Artist 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="preferred-categories" className="text-sm font-medium leading-none">
                    Preferred Categories
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Prioritize recommendations from your favorite categories.
                  </p>
                </div>
                <Select>
                  <SelectTrigger id="preferred-categories" className="w-40">
                    <SelectValue placeholder="Select categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
                    <SelectItem value="category3">Category 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Watchlist Management</CardTitle>
            <CardDescription>Manage your NFT watchlist and collections.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="watchlist" className="text-sm font-medium leading-none">
                    Watchlist
                  </Label>
                  <p className="text-sm text-muted-foreground">View and manage your NFT watchlist.</p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="collections" className="text-sm font-medium leading-none">
                    Collections
                  </Label>
                  <p className="text-sm text-muted-foreground">View and manage your NFT collections.</p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Marketplace Settings</CardTitle>
            <CardDescription>Choose and manage the NFT marketplaces you follow.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="marketplaces" className="text-sm font-medium leading-none">
                    Marketplaces
                  </Label>
                  <p className="text-sm text-muted-foreground">Select the NFT marketplaces you want to follow.</p>
                </div>
                <Select>
                  <SelectTrigger id="marketplaces" className="w-40">
                    <SelectValue placeholder="Select marketplaces" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="opensea">OpenSea</SelectItem>
                    <SelectItem value="blur">Blur</SelectItem>
                    <SelectItem value="rarible">Rarible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Price Alerts</CardTitle>
            <CardDescription>Manage your price alerts for your favorite NFTs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="price-alerts" className="text-sm font-medium leading-none">
                    Price Alerts
                  </Label>
                  <p className="text-sm text-muted-foreground">Add and manage price alerts for your favorite NFTs.</p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Manage your privacy settings for the NFT collection manager.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="data-collection" className="text-sm font-medium leading-none">
                    Data Collection
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow the plugin to collect browsing and purchase data.
                  </p>
                </div>
                <Switch id="data-collection" className="ml-auto" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>Customize the appearance of the NFT collection manager.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="theme" className="text-sm font-medium leading-none">
                    Theme
                  </Label>
                  <p className="text-sm text-muted-foreground">Choose a theme for the plugin.</p>
                </div>
                <Select>
                  <SelectTrigger id="theme" className="w-40">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="language" className="text-sm font-medium leading-none">
                    Language
                  </Label>
                  <p className="text-sm text-muted-foreground">Select the language for the plugin.</p>
                </div>
                <Select>
                  <SelectTrigger id="language" className="w-40">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Sync</CardTitle>
            <CardDescription>Sync your settings and preferences across devices.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="account-sync" className="text-sm font-medium leading-none">
                    Account Sync
                  </Label>
                  <p className="text-sm text-muted-foreground">Sync your settings and preferences across devices.</p>
                </div>
                <Switch id="account-sync" className="ml-auto" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Update Notifications</CardTitle>
            <CardDescription>Receive notifications about plugin updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="update-notifications" className="text-sm font-medium leading-none">
                    Update Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Get notified when the plugin is updated.</p>
                </div>
                <Switch id="update-notifications" className="ml-auto" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const Options = () => {
  const theme = useStorageSuspense(exampleThemeStorage);
  const isLight = theme === 'light';
  const logo = isLight ? 'options/logo_horizontal.svg' : 'options/logo_horizontal_dark.svg';

  return (
    <div className="container py-8">
      <Card>
        <ProfileForm />
      </Card>
    </div>
  );
};

// const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
//   const theme = useStorageSuspense(exampleThemeStorage);
//   return (
//     <button
//       className={
//         props.className +
//         ' ' +
//         'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
//         (theme === 'light' ? 'bg-white text-black' : 'bg-black text-white')
//       }
//       onClick={exampleThemeStorage.toggle}>
//       {props.children}
//     </button>
//   );
// };

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
