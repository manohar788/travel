import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, MapPin, Users, CalendarCheck, Bell,
  TrendingUp, DollarSign, Globe, Plus, Trash2, Edit3, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { destinations, notifications as defaultNotifs } from '@/data';
import { toast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

type Tab = 'overview' | 'destinations' | 'bookings' | 'users' | 'notifications';

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'destinations', label: 'Destinations', icon: MapPin },
  { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export function AdminDashboard() {
  const { isAdmin, bookings } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [notifList, setNotifList] = useState(defaultNotifs);
  const [newNotif, setNewNotif] = useState('');

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold font-display text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">You need admin privileges to access this page.</p>
          <Link to="/"><Button>Go Home</Button></Link>
        </div>
      </main>
    );
  }

  const totalRevenue = bookings
    .filter((b) => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const stats = [
    { label: 'Total Destinations', value: destinations.length.toString(), icon: Globe, color: 'gradient-ocean', shadow: 'shadow-ocean' },
    { label: 'Active Bookings', value: bookings.filter((b) => b.status === 'confirmed').length.toString(), icon: CalendarCheck, color: 'gradient-sunset', shadow: 'shadow-sunset' },
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-forest', shadow: '' },
    { label: 'Growth Rate', value: '+24%', icon: TrendingUp, color: 'bg-coral', shadow: '' },
  ];

  const addNotification = () => {
    if (!newNotif.trim()) return;
    setNotifList((prev) => [
      ...prev,
      { _id: Math.random().toString(36).slice(2), message: newNotif, type: 'info', active: true },
    ]);
    setNewNotif('');
    toast('Notification added', 'success');
  };

  const removeNotification = (id: string) => {
    setNotifList((prev) => prev.filter((n) => n._id !== id));
    toast('Notification removed', 'info');
  };

  const storedUsers = (() => {
    try {
      const data = localStorage.getItem('moodtravel_users');
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  })();

  return (
    <main className="min-h-screen bg-secondary/30 pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl gradient-ocean flex items-center justify-center shadow-ocean">
            <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your travel platform</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200",
                activeTab === tab.id
                  ? "gradient-ocean text-primary-foreground shadow-ocean"
                  : "text-muted-foreground hover:text-foreground hover:bg-card"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="hover:shadow-elevated transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold font-display text-foreground mt-1">{stat.value}</p>
                      </div>
                      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", stat.color, stat.shadow)}>
                        <stat.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No bookings yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Destination</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Travelers</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Amount</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 10).map((b) => (
                          <tr key={b._id} className="border-b border-border/50">
                            <td className="py-3 px-2 font-medium text-foreground">{b.destination?.name || 'Unknown'}</td>
                            <td className="py-3 px-2 text-muted-foreground">{new Date(b.travelDate).toLocaleDateString()}</td>
                            <td className="py-3 px-2 text-muted-foreground">{b.travelers}</td>
                            <td className="py-3 px-2 font-semibold text-foreground">${b.totalPrice.toLocaleString()}</td>
                            <td className="py-3 px-2">
                              <span className={cn(
                                "px-2.5 py-1 rounded-lg text-xs font-semibold capitalize",
                                b.status === 'confirmed' && "bg-forest/10 text-forest",
                                b.status === 'pending' && "bg-sunset/10 text-sunset-dark",
                                b.status === 'cancelled' && "bg-destructive/10 text-destructive",
                              )}>
                                {b.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Destinations */}
        {activeTab === 'destinations' && (
          <div className="animate-fade-in">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">All Destinations ({destinations.length})</CardTitle>
                <Button size="sm" variant="sunset" onClick={() => toast('Add destination form coming soon!', 'info')}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add New
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Image</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Name</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Country</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Rating</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Price</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Featured</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {destinations.map((d) => (
                        <tr key={d._id} className="border-b border-border/50">
                          <td className="py-3 px-2">
                            <img src={d.image} alt={d.name} className="w-12 h-9 object-cover rounded-lg" />
                          </td>
                          <td className="py-3 px-2 font-medium text-foreground">{d.name}</td>
                          <td className="py-3 px-2 text-muted-foreground">{d.country}</td>
                          <td className="py-3 px-2 text-foreground">{d.rating}</td>
                          <td className="py-3 px-2 text-muted-foreground capitalize">{d.priceRange}</td>
                          <td className="py-3 px-2">{d.featured ? '✓' : '—'}</td>
                          <td className="py-3 px-2">
                            <div className="flex gap-1">
                              <Link to={`/destination/${d._id}`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="h-3.5 w-3.5" />
                                </Button>
                              </Link>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast('Edit feature coming soon!', 'info')}>
                                <Edit3 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bookings */}
        {activeTab === 'bookings' && (
          <div className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">All Bookings ({bookings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-8 text-center">No bookings yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">ID</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Destination</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Travel Date</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Return Date</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Travelers</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Total</th>
                          <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((b) => (
                          <tr key={b._id} className="border-b border-border/50">
                            <td className="py-3 px-2 text-muted-foreground font-mono text-xs">#{b._id.slice(0, 8)}</td>
                            <td className="py-3 px-2 font-medium text-foreground">{b.destination?.name || 'Unknown'}</td>
                            <td className="py-3 px-2 text-muted-foreground">{new Date(b.travelDate).toLocaleDateString()}</td>
                            <td className="py-3 px-2 text-muted-foreground">{new Date(b.returnDate).toLocaleDateString()}</td>
                            <td className="py-3 px-2 text-muted-foreground">{b.travelers}</td>
                            <td className="py-3 px-2 font-semibold text-foreground">${b.totalPrice.toLocaleString()}</td>
                            <td className="py-3 px-2">
                              <span className={cn(
                                "px-2.5 py-1 rounded-lg text-xs font-semibold capitalize",
                                b.status === 'confirmed' && "bg-forest/10 text-forest",
                                b.status === 'pending' && "bg-sunset/10 text-sunset-dark",
                                b.status === 'cancelled' && "bg-destructive/10 text-destructive",
                              )}>
                                {b.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Registered Users ({storedUsers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Name</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Email</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {storedUsers.map((u: { name: string; email: string; role: string }, i: number) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-3 px-2 font-medium text-foreground">{u.name}</td>
                          <td className="py-3 px-2 text-muted-foreground">{u.email}</td>
                          <td className="py-3 px-2">
                            <span className={cn(
                              "px-2.5 py-1 rounded-lg text-xs font-semibold capitalize",
                              u.role === 'admin' ? "gradient-ocean text-primary-foreground" : "bg-secondary text-secondary-foreground"
                            )}>
                              {u.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Notification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter notification message..."
                    value={newNotif}
                    onChange={(e) => setNewNotif(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addNotification()}
                    className="flex-1"
                  />
                  <Button variant="sunset" onClick={addNotification}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Notifications ({notifList.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifList.map((n) => (
                    <div key={n._id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-secondary/60">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs font-semibold uppercase shrink-0",
                          n.type === 'promo' && "bg-sunset/10 text-sunset-dark",
                          n.type === 'info' && "bg-primary/10 text-primary",
                          n.type === 'alert' && "bg-destructive/10 text-destructive",
                        )}>
                          {n.type}
                        </span>
                        <span className="text-sm text-foreground truncate">{n.message}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                        onClick={() => removeNotification(n._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
