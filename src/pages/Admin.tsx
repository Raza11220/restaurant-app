import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, FolderPlus } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string | null;
  is_available: boolean;
  image_url: string | null;
}

const Admin = () => {
  const { user, role, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [itemDialog, setItemDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  // Category form
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  
  // Item form
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemAvailable, setItemAvailable] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || role !== "admin")) {
      toast.error("Access denied. Admin only.");
      navigate("/");
    }
  }, [user, role, authLoading, navigate]);

  useEffect(() => {
    if (role === "admin") {
      fetchData();
    }
  }, [role]);

  const fetchData = async () => {
    const [{ data: cats }, { data: items }] = await Promise.all([
      supabase.from("menu_categories").select("*").order("name"),
      supabase.from("menu_items").select("*").order("name"),
    ]);

    if (cats) setCategories(cats);
    if (items) setMenuItems(items);
    setLoading(false);
  };

  // Category handlers
  const handleSaveCategory = async () => {
    if (!catName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from("menu_categories")
          .update({ name: catName, description: catDesc || null })
          .eq("id", editingCategory.id);
        if (error) throw error;
        toast.success("Category updated");
      } else {
        const { error } = await supabase
          .from("menu_categories")
          .insert({ name: catName, description: catDesc || null });
        if (error) throw error;
        toast.success("Category created");
      }
      setCategoryDialog(false);
      resetCategoryForm();
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this category and all its items?")) return;
    
    const { error } = await supabase.from("menu_categories").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Category deleted");
      fetchData();
    }
  };

  const resetCategoryForm = () => {
    setCatName("");
    setCatDesc("");
    setEditingCategory(null);
  };

  const openEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setCatName(cat.name);
    setCatDesc(cat.description || "");
    setCategoryDialog(true);
  };

  // Item handlers
  const handleSaveItem = async () => {
    if (!itemName.trim() || !itemPrice || !itemCategory) {
      toast.error("Name, price, and category are required");
      return;
    }

    const price = parseFloat(itemPrice);
    if (isNaN(price) || price <= 0) {
      toast.error("Price must be a positive number");
      return;
    }

    try {
      if (editingItem) {
        const { error } = await supabase
          .from("menu_items")
          .update({
            name: itemName,
            description: itemDesc || null,
            price,
            category_id: itemCategory,
            is_available: itemAvailable,
          })
          .eq("id", editingItem.id);
        if (error) throw error;
        toast.success("Item updated");
      } else {
        const { error } = await supabase
          .from("menu_items")
          .insert({
            name: itemName,
            description: itemDesc || null,
            price,
            category_id: itemCategory,
            is_available: itemAvailable,
          });
        if (error) throw error;
        toast.success("Item created");
      }
      setItemDialog(false);
      resetItemForm();
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Delete this menu item?")) return;
    
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Item deleted");
      fetchData();
    }
  };

  const resetItemForm = () => {
    setItemName("");
    setItemDesc("");
    setItemPrice("");
    setItemCategory("");
    setItemAvailable(true);
    setEditingItem(null);
  };

  const openEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemDesc(item.description || "");
    setItemPrice(item.price.toString());
    setItemCategory(item.category_id || "");
    setItemAvailable(item.is_available ?? true);
    setItemDialog(true);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Admin Panel</h1>

        <Tabs defaultValue="items">
          <TabsList className="mb-6">
            <TabsTrigger value="items">Menu Items</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="items">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Menu Items</CardTitle>
                <Dialog open={itemDialog} onOpenChange={(open) => {
                  setItemDialog(open);
                  if (!open) resetItemForm();
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingItem ? "Edit Item" : "Add New Item"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Name</Label>
                        <Input value={itemName} onChange={(e) => setItemName(e.target.value)} />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} />
                      </div>
                      <div>
                        <Label>Price ($)</Label>
                        <Input type="number" step="0.01" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select value={itemCategory} onValueChange={setItemCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={itemAvailable} onCheckedChange={setItemAvailable} />
                        <Label>Available</Label>
                      </div>
                      <Button onClick={handleSaveItem} className="w-full">
                        {editingItem ? "Update" : "Create"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {menuItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          {categories.find((c) => c.id === item.category_id)?.name || "—"}
                        </TableCell>
                        <TableCell>${Number(item.price).toFixed(2)}</TableCell>
                        <TableCell>{item.is_available ? "Yes" : "No"}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openEditItem(item)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Categories</CardTitle>
                <Dialog open={categoryDialog} onOpenChange={(open) => {
                  setCategoryDialog(open);
                  if (!open) resetCategoryForm();
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <FolderPlus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Name</Label>
                        <Input value={catName} onChange={(e) => setCatName(e.target.value)} />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea value={catDesc} onChange={(e) => setCatDesc(e.target.value)} />
                      </div>
                      <Button onClick={handleSaveCategory} className="w-full">
                        {editingCategory ? "Update" : "Create"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((cat) => (
                      <TableRow key={cat.id}>
                        <TableCell className="font-medium">{cat.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{cat.description || "—"}</TableCell>
                        <TableCell>{menuItems.filter((i) => i.category_id === cat.id).length}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openEditCategory(cat)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(cat.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
