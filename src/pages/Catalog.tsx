import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const categories = [
  'Электроника', 'Текстиль', 'Продукты питания', 'Строительные материалы',
  'Автозапчасти', 'Медицинское оборудование', 'Мебель', 'Химическая продукция',
  'Упаковка', 'Металлопрокат', 'Пластик', 'Инструменты',
  'Бытовая техника', 'Косметика', 'Одежда', 'Обувь',
  'Игрушки', 'Спортивные товары', 'Канцелярия', 'Освещение'
];

const countries = ['Все страны', 'Россия', 'Китай', 'Турция', 'Германия', 'США', 'Италия', 'Польша'];

const allSuppliers = [
  { id: 1, name: 'ТехноТрейд', category: 'Электроника', country: 'Китай', rating: 4.8, verified: true, minOrder: 10000, deals: 245 },
  { id: 2, name: 'ТекстильПром', category: 'Текстиль', country: 'Турция', rating: 4.6, verified: true, minOrder: 50000, deals: 189 },
  { id: 3, name: 'СтройМастер', category: 'Строительные материалы', country: 'Россия', rating: 4.9, verified: true, minOrder: 100000, deals: 312 },
  { id: 4, name: 'АвтоПартс', category: 'Автозапчасти', country: 'Германия', rating: 4.7, verified: true, minOrder: 25000, deals: 156 },
  { id: 5, name: 'МедТехника Плюс', category: 'Медицинское оборудование', country: 'Россия', rating: 4.9, verified: true, minOrder: 150000, deals: 98 },
  { id: 6, name: 'ФудСнаб', category: 'Продукты питания', country: 'Россия', rating: 4.5, verified: true, minOrder: 30000, deals: 267 },
  { id: 7, name: 'ФурнитураПро', category: 'Мебель', country: 'Италия', rating: 4.8, verified: true, minOrder: 75000, deals: 134 },
  { id: 8, name: 'ХимПоставка', category: 'Химическая продукция', country: 'Германия', rating: 4.6, verified: true, minOrder: 45000, deals: 201 },
];

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Все страны');
  const [minOrderRange, setMinOrderRange] = useState([10000]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredSuppliers = allSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || supplier.category === selectedCategory;
    const matchesCountry = selectedCountry === 'Все страны' || supplier.country === selectedCountry;
    const matchesMinOrder = supplier.minOrder <= minOrderRange[0];
    const matchesVerified = !verifiedOnly || supplier.verified;
    
    return matchesSearch && matchesCategory && matchesCountry && matchesMinOrder && matchesVerified;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Package" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-primary">Поставщик.ру</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-sm font-medium text-primary">Каталог</Link>
            <Link to="/tenders" className="text-sm font-medium hover:text-primary transition-colors">Тендеры</Link>
            <Link to="/#tools" className="text-sm font-medium hover:text-primary transition-colors">Инструменты</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Вход</Button>
            <Button size="sm">Регистрация</Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Каталог поставщиков</h2>
          <p className="text-gray-600">Найдено {filteredSuppliers.length} проверенных компаний</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Фильтры</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Категория</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Все категории" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Все категории</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Страна</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Мин. заказ до: {minOrderRange[0].toLocaleString('ru-RU')} ₽
                  </label>
                  <Slider
                    value={minOrderRange}
                    onValueChange={setMinOrderRange}
                    min={10000}
                    max={200000}
                    step={10000}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <label htmlFor="verified" className="text-sm font-medium cursor-pointer">
                    Только верифицированные
                  </label>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedCountry('Все страны');
                    setMinOrderRange([10000]);
                    setVerifiedOnly(false);
                  }}
                >
                  Сбросить фильтры
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex gap-3">
              <Input
                placeholder="Поиск по названию или категории..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Icon name="Search" size={20} />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSuppliers.map(supplier => (
                <Card key={supplier.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      {supplier.verified && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          <Icon name="BadgeCheck" size={14} />
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{supplier.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="MapPin" size={16} className="text-muted-foreground" />
                      <span>{supplier.country}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Star" size={16} className="text-yellow-500" />
                      <span className="font-medium">{supplier.rating}</span>
                      <span className="text-muted-foreground">({supplier.deals} сделок)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Package" size={16} className="text-muted-foreground" />
                      <span>Мин. заказ: {supplier.minOrder.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <Button className="w-full mt-4" size="sm">Связаться</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSuppliers.length === 0 && (
              <div className="text-center py-12">
                <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Поставщики не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить фильтры поиска</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;
