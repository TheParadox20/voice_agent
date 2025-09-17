'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Separator } from "@/app/components/ui/separator";
import { Settings, User, Bell, Shield, CreditCard, Mic, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure your BM Voice AI platform preferences and settings
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="voice">Voice Agents</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@company.com" />
                </div>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue="ABC Bank Ltd" />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="africa/nairobi">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="africa/nairobi">Africa/Nairobi (GMT+3)</SelectItem>
                      <SelectItem value="africa/dar_es_salaam">Africa/Dar es Salaam (GMT+3)</SelectItem>
                      <SelectItem value="africa/kampala">Africa/Kampala (GMT+3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => alert("Account settings saved successfully!")}>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="defaultLanguage">Default Platform Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="sw">Kiswahili</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="defaultVoiceLanguage">Default Voice Agent Language</Label>
                  <Select defaultValue="mixed">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English Only</SelectItem>
                      <SelectItem value="sw">Swahili Only</SelectItem>
                      <SelectItem value="mixed">Auto-detect (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mic className="h-5 w-5 mr-2" />
                  Voice Agent Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Default Voice Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="defaultVoiceType">Default Voice Type</Label>
                      <Select defaultValue="female-kenyan">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female-kenyan">Female (Kenyan English)</SelectItem>
                          <SelectItem value="male-kenyan">Male (Kenyan English)</SelectItem>
                          <SelectItem value="female-swahili">Female (Kiswahili)</SelectItem>
                          <SelectItem value="male-swahili">Male (Kiswahili)</SelectItem>
                          <SelectItem value="female-tanzanian">Female (Tanzanian English)</SelectItem>
                          <SelectItem value="male-tanzanian">Male (Tanzanian English)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="speechRate">Default Speech Rate</Label>
                      <Select defaultValue="normal">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Slow (0.8x)</SelectItem>
                          <SelectItem value="normal">Normal (1.0x)</SelectItem>
                          <SelectItem value="fast">Fast (1.2x)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Voice Quality Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="hqVoice">High Quality Voice (Premium)</Label>
                        <p className="text-sm text-muted-foreground">Use advanced neural voices for better quality</p>
                      </div>
                      <Switch id="hqVoice" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="backgroundNoise">Background Noise Reduction</Label>
                        <p className="text-sm text-muted-foreground">Filter out ambient noise during calls</p>
                      </div>
                      <Switch id="backgroundNoise" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emotionalTone">Emotional Tone Adaptation</Label>
                        <p className="text-sm text-muted-foreground">Adjust voice tone based on conversation context</p>
                      </div>
                      <Switch id="emotionalTone" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Campaign Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Campaign Completion</Label>
                        <p className="text-sm text-muted-foreground">Notify when campaigns finish</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Campaign Errors</Label>
                        <p className="text-sm text-muted-foreground">Alert for campaign failures</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Low Response Rates</Label>
                        <p className="text-sm text-muted-foreground">Warning for poor campaign performance</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">System Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Voice Agent Status</Label>
                        <p className="text-sm text-muted-foreground">Updates on agent availability</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Usage Alerts</Label>
                        <p className="text-sm text-muted-foreground">Notify when approaching plan limits</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">Automated performance summaries</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Password & Authentication</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button variant="outline">Update Password</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable 2FA</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Switch />
                    </div>
                    <Button variant="outline" disabled>Configure 2FA</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">API Access</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>API Key</Label>
                      <div className="flex space-x-2">
                        <Input value="bm_sk_live_..." readOnly />
                        <Button variant="outline">Regenerate</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>API Access Logging</Label>
                        <p className="text-sm text-muted-foreground">Log all API requests for security</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Billing & Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Professional Plan</h4>
                      <span className="text-2xl font-bold">$299/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Includes 10,000 voice minutes, unlimited surveys, and priority support
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-medium">5,847</div>
                        <div className="text-muted-foreground">Minutes Used</div>
                      </div>
                      <div>
                        <div className="font-medium">23</div>
                        <div className="text-muted-foreground">Active Surveys</div>
                      </div>
                      <div>
                        <div className="font-medium">12</div>
                        <div className="text-muted-foreground">Days Remaining</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => alert("Upgrade plan modal would open")}>Upgrade Plan</Button>
                    <Button variant="outline" onClick={() => alert("Usage details would be displayed")}>View Usage</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-muted rounded mr-3 flex items-center justify-center">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">•••• •••• •••• 4242</div>
                          <div className="text-sm text-muted-foreground">Expires 12/26</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => alert("Update payment method modal would open")}>Update</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Billing History</h3>
                  <div className="space-y-2">
                    {[
                      { date: "Jan 1, 2025", amount: "$299.00", status: "Paid" },
                      { date: "Dec 1, 2024", amount: "$299.00", status: "Paid" },
                      { date: "Nov 1, 2024", amount: "$299.00", status: "Paid" },
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{invoice.date}</div>
                          <div className="text-sm text-muted-foreground">Professional Plan</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{invoice.amount}</div>
                          <div className="text-sm text-success">{invoice.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={() => alert("All invoices would be displayed")}>View All Invoices</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Integrations & APIs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">CRM Integration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-muted rounded-lg mr-3 flex items-center justify-center">
                          <Settings className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">Salesforce</div>
                          <div className="text-sm text-muted-foreground">Sync customer data and call logs</div>
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => alert("Salesforce integration would be configured")}>Connect</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-muted rounded-lg mr-3 flex items-center justify-center">
                          <Settings className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">HubSpot</div>
                          <div className="text-sm text-muted-foreground">Import contacts and track interactions</div>
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => alert("HubSpot integration would be configured")}>Connect</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Webhook Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="webhookUrl">Webhook URL</Label>
                      <Input id="webhookUrl" placeholder="https://your-domain.com/webhook" />
                    </div>
                    <div className="space-y-2">
                      <Label>Events to Subscribe</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="callCompleted" />
                          <Label htmlFor="callCompleted">Call Completed</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="surveyCompleted" />
                          <Label htmlFor="surveyCompleted">Survey Completed</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="campaignStarted" />
                          <Label htmlFor="campaignStarted">Campaign Started</Label>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => alert("Webhook settings saved successfully!")}>Save Webhook Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
