import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const tenders = [
  {
    id: 1,
    title: 'Поставка электроники для розничной сети',
    category: 'Электроника',
    budget: '5 000 000 ₽',
    deadline: '15 января 2025',
    offers: 12,
    status: 'active',
    description: 'Требуется закупка смартфонов, планшетов и аксессуаров для 20 магазинов'
  },
  {
    id: 2,
    title: 'Текстильная продукция для производства',
    category: 'Текстиль',
    budget: '2 500 000 ₽',
    deadline: '10 января 2025',
    offers: 8,
    status: 'active',
    description: 'Необходима закупка хлопковой ткани высокого качества'
  },
  {
    id: 3,
    title: 'Стройматериалы для коммерческого объекта',
    category: 'Строительные материалы',
    budget: '12 000 000 ₽',
    deadline: '20 января 2025',
    offers: 15,
    status: 'active',
    description: 'Закупка цемента, арматуры, кирпича для строительства торгового центра'
  },
  {
    id: 4,
    title: 'Автозапчасти для автопарка',
    category: 'Автозапчасти',
    budget: '3 200 000 ₽',
    deadline: '12 января 2025',
    offers: 6,
    status: 'active',
    description: 'Требуются оригинальные запчасти для грузовых автомобилей'
  },
];

const Tenders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    budget: '',
    deadline: '',
    description: ''
  });

  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tender.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || tender.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New tender:', formData);
    setIsDialogOpen(false);
    setFormData({ title: '', category: '', budget: '', deadline: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Package" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-primary">Поставщик.ру</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</Link>
            <Link to="/tenders" className="text-sm font-medium text-primary">Тендеры</Link>
            <Link to="/#tools" className="text-sm font-medium hover:text-primary transition-colors">Инструменты</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Вход</Button>
            <Button size="sm">Регистрация</Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Каталог тендеров</h2>
            <p className="text-gray-600">Активных закупок: {filteredTenders.length}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Icon name="Plus" size={20} />
                Создать тендер
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Создание тендера</DialogTitle>
                <DialogDescription>
                  Заполните информацию о вашей закупке. Поставщики смогут оставлять предложения
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Название тендера</label>
                  <Input
                    placeholder="Например: Поставка офисной мебели"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Категория</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Электроника">Электроника</SelectItem>
                      <SelectItem value="Текстиль">Текстиль</SelectItem>
                      <SelectItem value="Строительные материалы">Строительные материалы</SelectItem>
                      <SelectItem value="Автозапчасти">Автозапчасти</SelectItem>
                      <SelectItem value="Мебель">Мебель</SelectItem>
                      <SelectItem value="Продукты питания">Продукты питания</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Бюджет (₽)</label>
                    <Input
                      type="number"
                      placeholder="1000000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Срок подачи заявок</label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Описание закупки</label>
                  <Textarea
                    placeholder="Опишите требования к товарам, условия поставки, объемы..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-32"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">Опубликовать тендер</Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Отмена</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6 flex gap-4 flex-wrap">
          <Input
            placeholder="Поиск тендеров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Все категории" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все категории</SelectItem>
              <SelectItem value="Электроника">Электроника</SelectItem>
              <SelectItem value="Текстиль">Текстиль</SelectItem>
              <SelectItem value="Строительные материалы">Строительные материалы</SelectItem>
              <SelectItem value="Автозапчасти">Автозапчасти</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredTenders.map(tender => (
            <Card key={tender.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{tender.title}</CardTitle>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Активен
                  </Badge>
                </div>
                <CardDescription>{tender.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Tag" size={16} className="text-muted-foreground" />
                  <span>{tender.category}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                  <span className="font-semibold">Бюджет: {tender.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Calendar" size={16} className="text-muted-foreground" />
                  <span>До: {tender.deadline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span>{tender.offers} предложений от поставщиков</span>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button className="flex-1">Оставить предложение</Button>
                  <Button variant="outline">Подробнее</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTenders.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileSearch" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Тендеры не найдены</h3>
            <p className="text-muted-foreground mb-6">Попробуйте изменить параметры поиска</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Icon name="Plus" size={20} className="mr-2" />
              Создать первый тендер
            </Button>
          </div>
        )}
      </section>

      <section className="bg-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Как работают тендеры?</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h4 className="font-semibold">Создайте тендер</h4>
                <p className="text-sm text-muted-foreground">Опишите требования и условия закупки</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h4 className="font-semibold">Получите предложения</h4>
                <p className="text-sm text-muted-foreground">Поставщики отправят свои коммерческие предложения</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h4 className="font-semibold">Выберите лучшее</h4>
                <p className="text-sm text-muted-foreground">Сравните и выберите оптимальное предложение</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tenders;
