import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Электроника', emoji: '📱' },
  { name: 'Текстиль', emoji: '🧵' },
  { name: 'Продукты питания', emoji: '🍎' },
  { name: 'Строительные материалы', emoji: '🏗️' },
  { name: 'Автозапчасти', emoji: '🚗' },
  { name: 'Медицинское оборудование', emoji: '⚕️' },
  { name: 'Мебель', emoji: '🪑' },
  { name: 'Химическая продукция', emoji: '🧪' },
  { name: 'Упаковка', emoji: '📦' },
  { name: 'Металлопрокат', emoji: '⚙️' },
  { name: 'Пластик', emoji: '♻️' },
  { name: 'Инструменты', emoji: '🔧' },
  { name: 'Бытовая техника', emoji: '🔌' },
  { name: 'Косметика', emoji: '💄' },
  { name: 'Одежда', emoji: '👕' },
  { name: 'Обувь', emoji: '👟' },
  { name: 'Игрушки', emoji: '🧸' },
  { name: 'Спортивные товары', emoji: '⚽' },
  { name: 'Канцелярия', emoji: '✏️' },
  { name: 'Освещение', emoji: '💡' }
];

const suppliers = [
  { id: 1, name: 'ТехноТрейд', category: 'Электроника', country: 'Китай', rating: 4.8, verified: true, minOrder: '10 000 ₽' },
  { id: 2, name: 'ТекстильПром', category: 'Текстиль', country: 'Турция', rating: 4.6, verified: true, minOrder: '50 000 ₽' },
  { id: 3, name: 'СтройМастер', category: 'Строительные материалы', country: 'Россия', rating: 4.9, verified: true, minOrder: '100 000 ₽' },
  { id: 4, name: 'АвтоПартс', category: 'Автозапчасти', country: 'Германия', rating: 4.7, verified: true, minOrder: '25 000 ₽' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
            <Link to="/tenders" className="text-sm font-medium hover:text-primary transition-colors">Тендеры</Link>
            <Link to="/tools" className="text-sm font-medium hover:text-primary transition-colors">Инструменты</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Вход</Button>
            <Button size="sm">Регистрация</Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
            Единая платформа<br />B2B-торговли
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            15 000+ проверенных поставщиков из 60+ стран. Безопасные сделки и экономия до 30%
          </p>
          <div className="flex gap-3 max-w-2xl mx-auto mt-8">
            <Input
              placeholder="Поиск товаров или поставщиков..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12"
            />
            <Button size="lg" className="h-12 px-8">
              <Icon name="Search" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-6">Категории товаров</h3>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 w-max">
              {categories.map(category => (
                <Link key={category.name} to="/catalog">
                  <Card className="hover:shadow-lg hover:scale-105 transition-all cursor-pointer w-32">
                    <CardContent className="pt-6 pb-4 text-center">
                      <div className="text-4xl mb-3">{category.emoji}</div>
                      <p className="text-xs font-medium">{category.name}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>



      <section id="tenders" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Активные тендеры</h3>
            <Link to="/tenders">
              <Button variant="outline">Смотреть все</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge className="w-fit mb-2">Электроника</Badge>
                <CardTitle className="text-lg">Поставка смартфонов для сети</CardTitle>
                <CardDescription>Бюджет: 5 000 000 ₽</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">12 предложений</span>
                  <span className="text-primary font-medium">До 15 января</span>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge className="w-fit mb-2">Текстиль</Badge>
                <CardTitle className="text-lg">Хлопковая ткань для производства</CardTitle>
                <CardDescription>Бюджет: 2 500 000 ₽</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">8 предложений</span>
                  <span className="text-primary font-medium">До 10 января</span>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge className="w-fit mb-2">Стройматериалы</Badge>
                <CardTitle className="text-lg">Материалы для торгового центра</CardTitle>
                <CardDescription>Бюджет: 12 000 000 ₽</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">15 предложений</span>
                  <span className="text-primary font-medium">До 20 января</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary to-cyan-600 rounded-2xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Готовы начать?</h3>
          <p className="text-xl mb-8 opacity-90">Зарегистрируйтесь и получите доступ к тысячам проверенных поставщиков</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Я покупатель
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
              Я поставщик
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Package" size={24} className="text-primary" />
                <h4 className="text-white font-bold">Поставщик.ру</h4>
              </div>
              <p className="text-sm">Единая платформа B2B-торговли для безопасных сделок с проверенными поставщиками</p>
            </div>
            <div>
              <h5 className="text-white font-medium mb-4">Платформа</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Каталог поставщиков</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Тендеры</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Международный раздел</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-medium mb-4">Поддержка</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">База знаний</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Чат 24/7</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Telegram-бот</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-medium mb-4">Контакты</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>8 (800) 555-35-35</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@postavshik.ru</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            © 2024 Поставщик.ру. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;