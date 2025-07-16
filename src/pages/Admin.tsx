import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Users, Flag, Shield, UserCheck } from "lucide-react";
import { AuthGuard } from "@/components/auth-guard";

interface Profile {
  id: string;
  user_id: string;
  email: string;
  display_name: string;
  avatar_url: string;
  timezone: string;
  created_at: string;
  updated_at: string;
  user_roles: { role: string }[];
}

interface ContentFlag {
  id: string;
  profile_id: string;
  reason: string;
  description: string;
  status: string;
  created_at: string;
  flagged_by: string;
}

const Admin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [contentFlags, setContentFlags] = useState<ContentFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [newRole, setNewRole] = useState("");
  const [flagForm, setFlagForm] = useState({
    profileId: "",
    reason: "",
    description: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all users with their roles
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      // Fetch user roles separately
      const { data: rolesData } = await supabase
        .from("user_roles")
        .select("user_id, role");

      // Combine the data
      const profilesWithRoles = profilesData?.map(profile => ({
        ...profile,
        user_roles: rolesData?.filter(role => role.user_id === profile.user_id).map(r => ({ role: r.role })) || []
      })) || [];

      // Fetch content flags
      const { data: flagsData } = await supabase
        .from("content_flags")
        .select("*")
        .order("created_at", { ascending: false });

      setProfiles(profilesWithRoles);
      setContentFlags(flagsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async () => {
    if (!selectedUser || !newRole) return;

    try {
      // Remove existing role if changing
      await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", selectedUser.user_id);

      // Add new role
      const { error } = await supabase
        .from("user_roles")
        .insert({
          user_id: selectedUser.user_id,
          role: newRole as "admin" | "moderator" | "user",
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `User role updated to ${newRole}`,
      });

      fetchData();
      setSelectedUser(null);
      setNewRole("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createContentFlag = async () => {
    if (!flagForm.profileId || !flagForm.reason) return;

    try {
      const { error } = await supabase
        .from("content_flags")
        .insert({
          profile_id: flagForm.profileId,
          reason: flagForm.reason,
          description: flagForm.description,
          flagged_by: user?.id,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content flag created successfully",
      });

      fetchData();
      setFlagForm({ profileId: "", reason: "", description: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resolveFlag = async (flagId: string) => {
    try {
      const { error } = await supabase
        .from("content_flags")
        .update({
          status: "resolved",
          resolved_by: user?.id,
          resolved_at: new Date().toISOString(),
        })
        .eq("id", flagId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Flag resolved successfully",
      });

      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "moderator":
        return "default";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <AuthGuard requireAuth requireAdmin>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users and moderate content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profiles.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Flags</CardTitle>
              <Flag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contentFlags.filter(f => f.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {profiles.filter(p => p.user_roles.some(r => r.role === "admin")).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="flags">Content Moderation</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user roles and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Display Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell>{profile.email}</TableCell>
                        <TableCell>{profile.display_name}</TableCell>
                        <TableCell>
                          {profile.user_roles.map((userRole, index) => (
                            <Badge
                              key={index}
                              variant={getRoleBadgeVariant(userRole.role)}
                              className="mr-1"
                            >
                              {userRole.role}
                            </Badge>
                          ))}
                        </TableCell>
                        <TableCell>
                          {new Date(profile.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedUser(profile)}
                              >
                                <UserCheck className="h-4 w-4 mr-1" />
                                Edit Role
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Update User Role</DialogTitle>
                                <DialogDescription>
                                  Change the role for {profile.email}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="role">New Role</Label>
                                  <Select value={newRole} onValueChange={setNewRole}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="user">User</SelectItem>
                                      <SelectItem value="moderator">Moderator</SelectItem>
                                      <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button onClick={updateUserRole} className="w-full">
                                  Update Role
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flags">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create Content Flag</CardTitle>
                  <CardDescription>
                    Flag content that needs moderation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="profileId">Profile ID (Contentful Entry ID)</Label>
                    <Input
                      id="profileId"
                      value={flagForm.profileId}
                      onChange={(e) => setFlagForm(prev => ({ ...prev, profileId: e.target.value }))}
                      placeholder="Enter Contentful profile entry ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reason">Reason</Label>
                    <Select
                      value={flagForm.reason}
                      onValueChange={(value) => setFlagForm(prev => ({ ...prev, reason: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inappropriate-content">Inappropriate Content</SelectItem>
                        <SelectItem value="misinformation">Misinformation</SelectItem>
                        <SelectItem value="copyright">Copyright Violation</SelectItem>
                        <SelectItem value="spam">Spam</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={flagForm.description}
                      onChange={(e) => setFlagForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Provide additional details..."
                    />
                  </div>
                  <Button onClick={createContentFlag}>
                    Create Flag
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Flags</CardTitle>
                  <CardDescription>
                    Review and resolve flagged content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Profile ID</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contentFlags.map((flag) => (
                        <TableRow key={flag.id}>
                          <TableCell className="font-mono text-sm">{flag.profile_id}</TableCell>
                          <TableCell>{flag.reason}</TableCell>
                          <TableCell>
                            <Badge variant={flag.status === "pending" ? "destructive" : "default"}>
                              {flag.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(flag.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {flag.status === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => resolveFlag(flag.id)}
                              >
                                Resolve
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AuthGuard>
  );
};

export default Admin;