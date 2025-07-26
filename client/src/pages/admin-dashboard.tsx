import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, MessageSquare, HelpCircle, Briefcase, Users, Eye, EyeOff, Edit, Trash2, Plus, LogOut, Home, Palette, Star, GripVertical, Upload, Camera, Image, TrendingUp, Globe, Search, Ban, Target, Brain, Heart, BookOpen, Award, Shield, Sun, Moon, Sparkles, Handshake, MessageCircle, Leaf, Flower, Compass, ChevronUp, ChevronDown, TreePine, Wind, Umbrella, LifeBuoy, Puzzle, Waves, Mountain, Timer, Clock, Activity, Zap, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HeroColorSettings } from "@/components/admin/HeroColorSettings";
import { SectionColorManager } from "@/components/admin/SectionColorManager";
import type { SiteConfig, Testimonial, FaqItem, Service, PhotoCarousel, Specialty } from "@shared/schema";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Imports dos novos componentes
import { HeroImageUpload } from "@/components/admin/HeroImageUpload";
import { TestimonialImageUpload } from "@/components/admin/TestimonialImageUpload";
import { PhotoCarouselImageUpload } from "@/components/admin/PhotoCarouselImageUpload";
import { BasicInfoForm } from "@/components/admin/BasicInfoForm";
import { NavigationForm } from "@/components/admin/NavigationForm";
import { HeroSectionForm } from "@/components/admin/HeroSectionForm";
import { AboutSectionTextsForm } from "@/components/admin/AboutSectionTextsForm";
import { AboutCredentialsManager } from "@/components/admin/AboutCredentialsManager";
import { PhotoCarouselTextsForm } from "@/components/admin/PhotoCarouselTextsForm";
import { PhotoCarouselManager } from "@/components/admin/PhotoCarouselManager";
import { SpecialtiesManager } from "@/components/admin/SpecialtiesManager";
import { TestimonialsSectionTextsForm } from "@/components/admin/TestimonialsSectionTextsForm";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";
import { ServicesSectionTextsForm } from "@/components/admin/ServicesSectionTextsForm";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { FaqSectionTextsForm } from "@/components/admin/FaqSectionTextsForm";
import { FaqManager } from "@/components/admin/FaqManager";
import { SchedulingCardForm } from "@/components/admin/SchedulingCardForm";
import { ContactScheduleManager } from "@/components/admin/ContactScheduleManager";
import { FooterManager } from "@/components/admin/FooterManager";
import { SectionVisibilitySettings } from "@/components/admin/SectionVisibilitySettings";
import { MarketingSettings } from "@/components/admin/MarketingSettings";
import { AppearanceSettings } from "@/components/admin/AppearanceSettings";
import { InspirationalSectionForm } from "@/components/admin/InspirationalSectionForm";
import { MaintenanceForm } from "@/components/admin/MaintenanceForm";





export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [activeTab, setActiveTab] = useState("general");
    

  

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      setLocation("/09806446909");
    }
  }, [setLocation]);

  const logout = () => {
    localStorage.removeItem("admin_logged_in");
    setLocation("/09806446909");
  };

  // Queries
  const { data: siteConfigs = [] } = useQuery<SiteConfig[]>({
    queryKey: ["/api/admin/config"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/config");
      return response.json();
    },
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/admin/testimonials"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/testimonials");
      return response.json();
    },
  });

  const { data: faqItems = [] } = useQuery<FaqItem[]>({
    queryKey: ["/api/admin/faq"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/faq");
      return response.json();
    },
  });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/admin/services"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/services");
      return response.json();
    },
  });

  const { data: photoCarousel = [] } = useQuery<PhotoCarousel[]>({
    queryKey: ["/api/admin/photo-carousel"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/photo-carousel");
      return response.json();
    },
  });

  const { data: specialties = [] } = useQuery<Specialty[]>({
    queryKey: ["/api/admin/specialties"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/specialties");
      return response.json();
    },
  });

  const { data: contactSettings } = useQuery({
    queryKey: ["/api/admin/contact-settings"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/contact-settings");
      return response.json();
    },
  });

  const { data: footerSettings } = useQuery({
    queryKey: ["/api/admin/footer-settings"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/footer-settings");
      return response.json();
    },
  });

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Painel Admin
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                  Dra. Adrielle Benhossi
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Home className="w-4 h-4 mr-2" />
                  Ver Site
                </Button>
                <Button variant="outline" size="sm" className="sm:hidden">
                  <Home className="w-4 h-4" />
                </Button>
              </Link>
              <Button onClick={logout} variant="destructive" size="sm" className="hidden sm:flex">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
              <Button onClick={logout} variant="destructive" size="sm" className="sm:hidden">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Welcome Banner */}
        {showWelcomeBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-6"
          >
            <div 
              className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-3 sm:p-4 relative touch-pan-x cursor-pointer select-none"
              onTouchStart={(e) => {
                const touch = e.touches[0];
                e.currentTarget.dataset.startX = touch.clientX.toString();
                e.currentTarget.dataset.startY = touch.clientY.toString();
              }}
              onTouchMove={(e) => {
                const startX = parseFloat(e.currentTarget.dataset.startX || '0');
                const startY = parseFloat(e.currentTarget.dataset.startY || '0');
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                const deltaX = currentX - startX;
                const deltaY = currentY - startY;
                
                // Só processar swipe horizontal se for maior que vertical
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                  e.currentTarget.style.transform = `translateX(${deltaX}px)`;
                  e.currentTarget.style.opacity = Math.max(0.3, 1 - Math.abs(deltaX) / 200).toString();
                }
              }}
              onTouchEnd={(e) => {
                const startX = parseFloat(e.currentTarget.dataset.startX || '0');
                const startY = parseFloat(e.currentTarget.dataset.startY || '0');
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const deltaX = endX - startX;
                const deltaY = endY - startY;
                
                // Reset transform primeiro
                e.currentTarget.style.transform = '';
                e.currentTarget.style.opacity = '';
                
                // Se swipe horizontal for significativo (mais de 80px) e maior que vertical, fechar
                if (Math.abs(deltaX) > 80 && Math.abs(deltaX) > Math.abs(deltaY)) {
                  setShowWelcomeBanner(false);
                }
              }}
            >
              <button
                onClick={() => setShowWelcomeBanner(false)}
                className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-600 hover:text-gray-800 transition-colors text-xl sm:text-lg font-bold bg-white/70 hover:bg-white/90 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shadow-sm border border-gray-200"
                aria-label="Fechar notificação"
              >
                ×
              </button>
              <div className="pr-8 sm:pr-10">
                <h3 className="font-semibold text-purple-900 mb-1 sm:mb-2 text-sm sm:text-base">
                  👋 Bem-vinda, Leleli!
                </h3>
                <p className="text-xs sm:text-sm text-purple-800 leading-relaxed">
                  Aqui você personaliza tudo do seu site! Mexe nos textos, cores, suas fotos, depoimentos dos pacientes, 
                  seus serviços, FAQ e configura os pixels pro Facebook e Google. Toda mudança já fica no ar na hora!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Navegação Unificada - Select Dropdown para Mobile e Desktop */}
            <div className="w-full">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full bg-white border-gray-300 hover:border-purple-400 transition-colors">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {activeTab === "general" && "📋"}
                        {activeTab === "about" && "👩‍⚕️"}
                        {activeTab === "gallery" && "📸"}
                        {activeTab === "specialties" && "🎯"}
                        {activeTab === "testimonials" && "💬"}
                        {activeTab === "services" && "🔧"}
                        {activeTab === "faq" && "❓"}
                        {activeTab === "contact-schedule" && "📞"}
                        {activeTab === "footer" && "🦶"}
                        {activeTab === "visibility" && "👁️"}
                        {activeTab === "marketing" && "📊"}
                        {activeTab === "appearance" && "🎨"}
                      </span>
                      <span className="font-medium">
                        {activeTab === "general" && "Configurações Gerais"}
                        {activeTab === "about" && "Gerenciar Sobre"}
                        {activeTab === "gallery" && "Galeria de Fotos"}
                        {activeTab === "specialties" && "Minhas Especialidades"}
                        {activeTab === "testimonials" && "Gerenciar Depoimentos"}
                        {activeTab === "services" && "Gerenciar Serviços"}
                        {activeTab === "faq" && "Gerenciar FAQ"}
                        {activeTab === "contact-schedule" && "Contato e Horários"}
                        {activeTab === "footer" && "Gerenciar Rodapé"}
                        {activeTab === "visibility" && "Controlar Visibilidade"}
                        {activeTab === "marketing" && "Pixels de Marketing"}
                        {activeTab === "appearance" && "Personalizar Cores"}
                      </span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="w-full">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                      Configurações do Site
                    </div>
                    <SelectItem value="general" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📋</span>
                        <div>
                          <div className="font-medium">Configurações Gerais</div>
                          <div className="text-xs text-gray-500">Informações básicas, textos e foto</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="about" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">👩‍⚕️</span>
                        <div>
                          <div className="font-medium">Gerenciar Sobre</div>
                          <div className="text-xs text-gray-500">Credenciais e qualificações</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="gallery" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📸</span>
                        <div>
                          <div className="font-medium">Galeria de Fotos</div>
                          <div className="text-xs text-gray-500">Carrossel do consultório</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="specialties" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🎯</span>
                        <div>
                          <div className="font-medium">Minhas Especialidades</div>
                          <div className="text-xs text-gray-500">Áreas de atuação</div>
                        </div>
                      </div>
                    </SelectItem>
                  </div>
                  
                  <div className="p-2 border-t">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                      Conteúdo
                    </div>
                    <SelectItem value="testimonials" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">💬</span>
                        <div>
                          <div className="font-medium">Gerenciar Depoimentos</div>
                          <div className="text-xs text-gray-500">Avaliações de pacientes</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="services" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🔧</span>
                        <div>
                          <div className="font-medium">Gerenciar Serviços</div>
                          <div className="text-xs text-gray-500">Tipos de atendimento e preços</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="faq" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">❓</span>
                        <div>
                          <div className="font-medium">Gerenciar FAQ</div>
                          <div className="text-xs text-gray-500">Perguntas frequentes</div>
                        </div>
                      </div>
                    </SelectItem>
                  </div>

                  <div className="p-2 border-t">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                      Contato e Layout
                    </div>
                    <SelectItem value="contact-schedule" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📞</span>
                        <div>
                          <div className="font-medium">Contato e Horários</div>
                          <div className="text-xs text-gray-500">Botões e informações de contato</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="footer" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🦶</span>
                        <div>
                          <div className="font-medium">Gerenciar Rodapé</div>
                          <div className="text-xs text-gray-500">Links e informações finais</div>
                        </div>
                      </div>
                    </SelectItem>
                  </div>

                  <div className="p-2 border-t">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                      Configurações Avançadas
                    </div>
                    <SelectItem value="visibility" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">👁️</span>
                        <div>
                          <div className="font-medium">Controlar Visibilidade</div>
                          <div className="text-xs text-gray-500">Mostrar/ocultar seções</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="marketing" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📊</span>
                        <div>
                          <div className="font-medium">Pixels de Marketing</div>
                          <div className="text-xs text-gray-500">Facebook, Google Analytics</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="appearance" className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🎨</span>
                        <div>
                          <div className="font-medium">Personalizar Cores</div>
                          <div className="text-xs text-gray-500">Temas e paletas de cores</div>
                        </div>
                      </div>
                    </SelectItem>
                  </div>
                </SelectContent>
              </Select>
            </div>

            {/* General Tab */}
            <TabsContent value="general" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
              </div>
              <div className="grid gap-6">
                {/* Informações Básicas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-lg">👤</span>
                      Informações Básicas
                    </CardTitle>
                    <CardDescription>
                      Configure os dados principais: nome, CRP, descrição e foto de perfil
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BasicInfoForm configs={siteConfigs} />
                  </CardContent>
                </Card>

                {/* Seção Hero */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-lg">🏠</span>
                      Seção Principal (Hero)
                    </CardTitle>
                    <CardDescription>
                      Configure a primeira seção que os visitantes veem
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HeroSectionForm configs={siteConfigs} />
                  </CardContent>
                </Card>

                {/* Seção Citação Inspiracional */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-lg">💭</span>
                      Citação Inspiracional
                    </CardTitle>
                    <CardDescription>
                      Configure a frase motivacional que aparece na seção inspiracional
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InspirationalSectionForm configs={siteConfigs} />
                  </CardContent>
                </Card>

                

                {/* Navegação */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-lg">🧭</span>
                      Menu de Navegação
                    </CardTitle>
                    <CardDescription>
                      Personalize os nomes dos botões do menu (apenas os nomes, as funcionalidades permanecem)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <NavigationForm configs={siteConfigs} />
                  </CardContent>
                </Card>

                {/* Modo Manutenção */}
                <Card className="border-orange-200 bg-orange-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-800">
                      <span className="text-lg">🚧</span>
                      Modo de Manutenção
                    </CardTitle>
                    <CardDescription className="text-orange-700">
                      Controle se o site fica público ou em manutenção
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MaintenanceForm configs={siteConfigs} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
              </div>

              {/* Configurações de Texto da Seção Sobre */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Textos da Seção Sobre
                  </CardTitle>
                  <CardDescription>
                    Configure os textos que aparecem no cabeçalho da seção sobre
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AboutSectionTextsForm configs={siteConfigs} />
                </CardContent>
              </Card>

              {/* Credenciais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">🎓</span>
                    Gerenciar Credenciais
                  </CardTitle>
                  <CardDescription>
                    Configure as credenciais, qualificações e especializações exibidas na seção "Sobre". 
                    Cada item aparece como um card com gradiente personalizado na seção sobre a psicóloga.
                    Arraste e solte para reordenar a sequência de exibição.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AboutCredentialsManager configs={siteConfigs} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="space-y-6">
              {/* Configurações de Texto da Galeria */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Textos da Seção Galeria
                  </CardTitle>
                  <CardDescription>
                    Configure os textos que aparecem no cabeçalho da galeria de fotos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PhotoCarouselTextsForm configs={siteConfigs} />
                </CardContent>
              </Card>

              {/* Gerenciamento de Fotos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📸</span>
                    Gerenciar Fotos do Carrossel
                  </CardTitle>
                  <CardDescription>
                    Adicione, edite e organize as fotos do consultório. O carrossel avança automaticamente a cada 6 segundos.
                    Arraste e solte para reordenar as fotos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PhotoCarouselManager photoCarousel={photoCarousel} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Specialties Tab */}
            <TabsContent value="specialties" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Minhas Especialidades</CardTitle>
                  <CardDescription>
                    Configure suas áreas de especialização que aparecem na seção "Sobre". 
                    Defina título, descrição, ícone e cor para cada especialidade.
                    Arraste e solte para reordenar por prioridade.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SpecialtiesManager specialties={specialties} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
              </div>

              {/* Configurações de Texto da Seção Depoimentos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Textos da Seção Depoimentos
                  </CardTitle>
                  <CardDescription>
                    Configure os textos que aparecem no cabeçalho da seção de depoimentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TestimonialsSectionTextsForm configs={siteConfigs} />
                </CardContent>
              </Card>

              {/* Gerenciamento de Depoimentos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">💬</span>
                    Gerenciar Depoimentos
                  </CardTitle>
                  <CardDescription>
                    Aqui você adiciona, edita ou remove depoimentos dos seus pacientes. 
                    Use avatares variados para representar diferentes perfis de clientes. 
                    Arraste e solte para reordenar a sequência de exibição no site.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TestimonialsManager testimonials={testimonials} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
              </div>

              {/* Configurações de Texto da Seção Serviços */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Textos da Seção Serviços
                  </CardTitle>
                  <CardDescription>
                    Configure os textos que aparecem no cabeçalho da seção de serviços
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ServicesSectionTextsForm configs={siteConfigs} />
                </CardContent>
              </Card>

              {/* Gerenciamento de Serviços */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">🔧</span>
                    Gerenciar Serviços
                  </CardTitle>
                  <CardDescription>
                    Configure os serviços que você oferece: título, descrição, ícone e preços. 
                    Escolha entre 40+ ícones profissionais organizados por categorias. 
                    Ative/desative serviços e reordene usando arrastar e soltar.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ServicesManager services={services} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
              </div>

              {/* Configurações de Texto da Seção FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Textos da Seção FAQ
                  </CardTitle>
                  <CardDescription>
                    Configure os textos que aparecem no cabeçalho da seção de FAQ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FaqSectionTextsForm configs={siteConfigs} />
                </CardContent>
              </Card>

              {/* Gerenciamento de FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">❓</span>
                    Gerenciar FAQ
                  </CardTitle>
                  <CardDescription>
                    Crie perguntas e respostas frequentes sobre seus serviços. 
                    Ajude seus futuros pacientes esclarecendo dúvidas comuns. 
                    Organize as perguntas arrastando para reordenar por importância.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FaqManager faqItems={faqItems} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Visibility Tab */}
            <TabsContent value="visibility" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visibilidade das Seções</CardTitle>
                  <CardDescription>
                    Controle quais seções do site estão visíveis para os visitantes. 
                    Você pode temporariamente desativar seções durante atualizações ou manutenção.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SectionVisibilitySettings configs={siteConfigs} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Marketing Tab */}
            <TabsContent value="marketing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Marketing</CardTitle>
                  <CardDescription>
                    Configure códigos de acompanhamento para medir visitas e resultados. 
                    Google Analytics mostra estatísticas detalhadas. Facebook Pixel permite criar anúncios direcionados. 
                    Cole os códigos fornecidos por essas plataformas aqui.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MarketingSettings configs={siteConfigs} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Schedule Tab */}
            <TabsContent value="contact-schedule" className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Dica:</strong> Os campos de texto podem ser redimensionados arrastando o canto inferior direito para aumentar o tamanho.
                </p>
              </div>

              {/* Configurações do Card de Agendamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Card de Agendamento
                  </CardTitle>
                  <CardDescription>
                    Configure os textos do card "Vamos conversar?" que aparece na seção de contato
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SchedulingCardForm configs={siteConfigs} />
                </CardContent>
              </Card>

              {/* Gerenciamento de Contato */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">📱</span>
                    Gerenciar Botões e Horários
                  </CardTitle>
                  <CardDescription>
                    Configure botões de contato, horários de funcionamento e localização. 
                    Personalize botões de contato, reordene por prioridade e defina links personalizados.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactScheduleManager contactSettings={contactSettings} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Footer Tab */}
            <TabsContent value="footer" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Rodapé</CardTitle>
                  <CardDescription>
                    Configure todos os elementos do rodapé: textos, botões de contato, certificações, 
                    selos de confiança, informações de copyright e CNPJ. Personalize cores, ícones e ordenação.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FooterManager footerSettings={footerSettings} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <div className="grid gap-6">
                {/* Gerenciador de Cores por Seção */}
                <SectionColorManager configs={siteConfigs} />
                
                {/* Configurações Globais de Aparência */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cores Globais do Sistema</CardTitle>
                    <CardDescription>
                      Configure as cores principais que afetam botões, links e elementos interativos em todo o site
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AppearanceSettings configs={siteConfigs} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="text-center text-xs text-gray-400">
            Made with <span className="text-yellow-500">♥</span> by <span className="font-mono">∞</span>
          </div>
        </div>
      </div>
    </div>
  );
}









// Componente arrastável para item de seção
function SortableSectionItem({ section, isVisible, onToggleVisibility }: {
  section: any;
  isVisible: boolean;
  onToggleVisibility: (key: string, visible: boolean) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`sortable-item flex items-center justify-between p-4 border rounded-lg bg-white ${isDragging ? 'dragging' : ''}`}
    >
      <div className="flex items-start gap-3 flex-1">
        <div 
          {...attributes} 
          {...listeners}
          className="drag-handle p-2 -ml-2"
        >
          <GripVertical className="w-5 h-5 text-gray-400" />
        </div>
        <div className="text-2xl">{section.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{section.name}</h3>
            <Badge variant={isVisible ? "default" : "secondary"} className="text-xs">
              {isVisible ? "Visível" : "Oculta"}
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{section.description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Switch
          checked={isVisible}
          onCheckedChange={(checked) => onToggleVisibility(section.key, checked)}
        />
        {isVisible ? (
          <Eye className="w-5 h-5 text-green-600" />
        ) : (
          <EyeOff className="w-5 h-5 text-gray-400" />
        )}
      </div>
    </div>
  );
}





























// Componente de item arrastável para serviços
function SortableServiceItem({ service, onEdit, onDelete }: { 
  service: Service; 
  onEdit: (service: Service) => void; 
  onDelete: (id: number) => void; 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: service.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="flex items-center gap-2">
        <div {...attributes} {...listeners} className="cursor-grab hover:cursor-grabbing">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        <span className="font-medium">{service.title}</span>
      </TableCell>
      <TableCell>{service.duration}</TableCell>
      <TableCell>{service.price}</TableCell>
      <TableCell>
        <Badge variant={service.isActive ? "default" : "secondary"}>
          {service.isActive ? (
            <>
              <Eye className="w-3 h-3 mr-1" />
              Ativo
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3 mr-1" />
              Inativo
            </>
          )}
        </Badge>
      </TableCell>
      <TableCell>{service.order}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(service)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDelete(service.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

function ServicesManager({ services }: { services: Service[] }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Sensores otimizados para mobile e desktop
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const serviceSchema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    duration: z.string().optional(),
    price: z.string().optional(),
    icon: z.string().min(1, "Ícone é obrigatório"),
    gradient: z.string().min(1, "Gradiente é obrigatório"),
    showPrice: z.boolean(),
    showDuration: z.boolean(),
    isActive: z.boolean(),
    order: z.number().min(0),
  });

  type ServiceForm = z.infer<typeof serviceSchema>;

  const form = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      price: "",
      icon: "Brain",
      gradient: "from-pink-500 to-purple-600",
      showPrice: true,
      showDuration: true,
      isActive: true,
      order: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: ServiceForm) => {
      const response = await apiRequest("POST", "/api/admin/services", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({ title: "Serviço criado com sucesso!" });
      setIsDialogOpen(false);
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ServiceForm> }) => {
      const response = await apiRequest("PUT", `/api/admin/services/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({ title: "Serviço atualizado com sucesso!" });
      setEditingService(null);
      setIsDialogOpen(false);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/services/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({ title: "Serviço excluído com sucesso!" });
    },
  });
  
  // Função para lidar com o drag end dos serviços
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      const oldIndex = services.findIndex((item) => item.id === active.id);
      const newIndex = services.findIndex((item) => item.id === over.id);
      
      const reorderedServices = arrayMove(services, oldIndex, newIndex);
      
      // Atualiza as ordens no backend
      const updatePromises = reorderedServices.map((item, index) => 
        apiRequest("PUT", `/api/admin/services/${item.id}`, { 
          order: index
        })
      );
      
      Promise.all(updatePromises).then(() => {
        queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
        toast({ title: "Ordem dos serviços atualizada!" });
      }).catch(() => {
        toast({ title: "Erro ao atualizar ordem", variant: "destructive" });
      });
    }
  };



  const onSubmit = (data: ServiceForm) => {
    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    
    // Log para debug
    console.log("Editando serviço:", service);
    
    // Popula o formulário campo por campo
    setTimeout(() => {
      form.setValue("title", service.title || "");
      form.setValue("description", service.description || "");
      form.setValue("duration", service.duration || "");
      form.setValue("price", service.price || "");
      form.setValue("icon", service.icon || "Brain");
      form.setValue("gradient", service.gradient || "from-pink-500 to-purple-600");
      form.setValue("showPrice", service.showPrice ?? true);
      form.setValue("showDuration", service.showDuration ?? true);
      form.setValue("isActive", service.isActive ?? true);
      form.setValue("order", service.order || 0);
    }, 100);
    
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingService(null);
    form.reset({
      title: "",
      description: "",
      duration: "",
      price: "",
      icon: "Brain",
      gradient: "from-pink-500 to-purple-600",
      showPrice: true,
      showDuration: true,
      isActive: true,
      order: 0,
    });
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Gerenciar Serviços
            </CardTitle>
            <CardDescription>
              Gerencie os serviços oferecidos exibidos no site
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Serviço
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? "Editar Serviço" : "Novo Serviço"}
                </DialogTitle>
                <DialogDescription>
                  Preencha as informações do serviço
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input placeholder="Terapia Individual" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Atendimento psicológico individual..." rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duração</FormLabel>
                          <FormControl>
                            <Input placeholder="50 minutos" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço</FormLabel>
                          <FormControl>
                            <Input placeholder="R$ 150,00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ícone</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um ícone" />
                              </SelectTrigger>
                              <SelectContent className="max-h-80">
                                {/* Ícones Principais */}
                                <SelectItem value="Brain"><Brain className="w-4 h-4 mr-2 inline" />Cérebro (Terapia Individual)</SelectItem>
                                <SelectItem value="Heart"><Heart className="w-4 h-4 mr-2 inline" />Coração (Terapia de Casal)</SelectItem>
                                <SelectItem value="Users"><Users className="w-4 h-4 mr-2 inline" />Usuários (Terapia de Grupo)</SelectItem>
                                
                                {/* Ícones de Saúde Mental */}
                                <SelectItem value="Activity"><Activity className="w-4 h-4 mr-2 inline" />Atividade (Terapia Comportamental)</SelectItem>
                                <SelectItem value="Zap"><Zap className="w-4 h-4 mr-2 inline" />Energia (Terapia Energética)</SelectItem>
                                <SelectItem value="Shield"><Shield className="w-4 h-4 mr-2 inline" />Escudo (Terapia de Proteção)</SelectItem>
                                <SelectItem value="Target"><Target className="w-4 h-4 mr-2 inline" />Alvo (Terapia Focada)</SelectItem>
                                
                                {/* Ícones de Bem-estar */}
                                <SelectItem value="Sun"><Sun className="w-4 h-4 mr-2 inline" />Sol (Terapia de Humor)</SelectItem>
                                <SelectItem value="Moon"><Moon className="w-4 h-4 mr-2 inline" />Lua (Terapia do Sono)</SelectItem>
                                <SelectItem value="Star"><Star className="w-4 h-4 mr-2 inline" />Estrela (Terapia de Objetivos)</SelectItem>
                                <SelectItem value="Sparkles"><Sparkles className="w-4 h-4 mr-2 inline" />Brilhos (Terapia de Autoconfiança)</SelectItem>
                                
                                {/* Ícones de Comunicação */}
                                <SelectItem value="MessageCircle"><MessageCircle className="w-4 h-4 mr-2 inline" />Conversa (Terapia Dialógica)</SelectItem>
                                <SelectItem value="MessageSquare"><MessageSquare className="w-4 h-4 mr-2 inline" />Mensagem (Terapia Online)</SelectItem>
                                
                                {/* Ícones de Crescimento */}
                                <SelectItem value="TrendingUp"><TrendingUp className="w-4 h-4 mr-2 inline" />Crescimento (Desenvolvimento Pessoal)</SelectItem>
                                <SelectItem value="Award"><Award className="w-4 h-4 mr-2 inline" />Prêmio (Conquistas)</SelectItem>
                                <SelectItem value="BookOpen"><BookOpen className="w-4 h-4 mr-2 inline" />Livro (Aprendizagem)</SelectItem>
                                
                                {/* Ícones de Mindfulness */}
                                <SelectItem value="Leaf"><Leaf className="w-4 h-4 mr-2 inline" />Folha (Terapia Natural)</SelectItem>
                                <SelectItem value="Flower"><Flower className="w-4 h-4 mr-2 inline" />Flor (Terapia Floral)</SelectItem>
                                <SelectItem value="TreePine"><TreePine className="w-4 h-4 mr-2 inline" />Pinheiro (Terapia na Natureza)</SelectItem>
                                <SelectItem value="Wind"><Wind className="w-4 h-4 mr-2 inline" />Vento (Terapia Respiratória)</SelectItem>
                                
                                {/* Ícones de Apoio */}
                                <SelectItem value="Handshake"><Handshake className="w-4 h-4 mr-2 inline" />Aperto de Mão (Terapia de Apoio)</SelectItem>
                                <SelectItem value="HelpCircle"><HelpCircle className="w-4 h-4 mr-2 inline" />Ajuda (Orientação Psicológica)</SelectItem>
                                <SelectItem value="LifeBuoy"><LifeBuoy className="w-4 h-4 mr-2 inline" />Boia (Terapia de Emergência)</SelectItem>
                                <SelectItem value="Umbrella"><Umbrella className="w-4 h-4 mr-2 inline" />Guarda-chuva (Terapia Preventiva)</SelectItem>
                                
                                {/* Ícones de Família */}
                                <SelectItem value="Home"><Home className="w-4 h-4 mr-2 inline" />Casa (Terapia Familiar)</SelectItem>
                                <SelectItem value="Puzzle"><Puzzle className="w-4 h-4 mr-2 inline" />Quebra-cabeça (Terapia Cognitiva)</SelectItem>
                                <SelectItem value="Palette"><Palette className="w-4 h-4 mr-2 inline" />Paleta (Arteterapia)</SelectItem>
                                
                                {/* Ícones de Movimento */}
                                <SelectItem value="Waves"><Waves className="w-4 h-4 mr-2 inline" />Ondas (Terapia Aquática)</SelectItem>
                                <SelectItem value="Mountain"><Mountain className="w-4 h-4 mr-2 inline" />Montanha (Terapia de Superação)</SelectItem>
                                <SelectItem value="Compass"><Compass className="w-4 h-4 mr-2 inline" />Bússola (Orientação de Vida)</SelectItem>
                                
                                {/* Ícones de Tempo */}
                                <SelectItem value="Clock"><Clock className="w-4 h-4 mr-2 inline" />Relógio (Terapia Breve)</SelectItem>
                                <SelectItem value="Timer"><Timer className="w-4 h-4 mr-2 inline" />Cronômetro (Sessões Programadas)</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gradient"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gradiente de Cor</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um gradiente" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="from-pink-500 to-purple-600">Rosa para Roxo</SelectItem>
                                <SelectItem value="from-purple-600 to-pink-500">Roxo para Rosa</SelectItem>
                                <SelectItem value="from-blue-500 to-indigo-600">Azul para Índigo</SelectItem>
                                <SelectItem value="from-green-500 to-teal-600">Verde para Teal</SelectItem>
                                <SelectItem value="from-orange-500 to-red-600">Laranja para Vermelho</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="showPrice"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Exibir Preço</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Mostrar o preço no site
                            </div>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="showDuration"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Exibir Duração</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Mostrar a duração no site
                            </div>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Ativo</FormLabel>
                              <div className="text-sm text-muted-foreground">
                                Exibir este serviço no site
                              </div>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <FormLabel className="text-sm">Prioridade</FormLabel>
                      <div className="flex flex-col sm:flex-row gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 text-xs"
                          onClick={() => {
                            const currentOrder = form.getValues("order");
                            form.setValue("order", Math.max(0, currentOrder - 1));
                          }}
                        >
                          <ChevronUp className="w-3 h-3" />
                          <span className="hidden sm:inline ml-1">Subir</span>
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 text-xs"
                          onClick={() => {
                            const currentOrder = form.getValues("order");
                            form.setValue("order", currentOrder + 1);
                          }}
                        >
                          <ChevronDown className="w-3 h-3" />
                          <span className="hidden sm:inline ml-1">Descer</span>
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground text-center">
                        Ordem: {form.watch("order")}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                      {editingService ? "Atualizar" : "Criar"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Dica:</strong> Arraste e solte os serviços para reordenar a exibição no site.
          </p>
        </div>
        
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ordem</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext 
                items={services.map(s => s.id)} 
                strategy={verticalListSortingStrategy}
              >
                {services
                  .sort((a, b) => a.order - b.order)
                  .map((service) => (
                    <SortableServiceItem
                      key={service.id}
                      service={service}
                      onEdit={openEditDialog}
                      onDelete={(id) => deleteMutation.mutate(id)}
                    />
                  ))}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </CardContent>
    </Card>
  );
}

function SpecialtiesManager({ specialties }: { specialties: Specialty[] }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<Specialty | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sensores otimizados para mobile e desktop
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const specialtySchema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    icon: z.string().min(1, "Ícone é obrigatório"),
    iconColor: z.string().min(1, "Cor é obrigatória"),
    isActive: z.boolean(),
    order: z.number().min(0),
  });

  type SpecialtyForm = z.infer<typeof specialtySchema>;

  const form = useForm<SpecialtyForm>({
    resolver: zodResolver(specialtySchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "Brain",
      iconColor: "#ec4899",
      isActive: true,
      order: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: SpecialtyForm) => {
      const response = await apiRequest("POST", "/api/admin/specialties", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/specialties"] });
      queryClient.invalidateQueries({ queryKey: ["/api/specialties"] });
      toast({ title: "Especialidade criada com sucesso!" });
      setIsDialogOpen(false);
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<SpecialtyForm> }) => {
      const response = await apiRequest("PUT", `/api/admin/specialties/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/specialties"] });
      queryClient.invalidateQueries({ queryKey: ["/api/specialties"] });
      toast({ title: "Especialidade atualizada com sucesso!" });
      setEditingItem(null);
      setIsDialogOpen(false);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/specialties/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/specialties"] });
      queryClient.invalidateQueries({ queryKey: ["/api/specialties"] });
      toast({ title: "Especialidade excluída com sucesso!" });
    },
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      const oldIndex = specialties.findIndex((item) => item.id === active.id);
      const newIndex = specialties.findIndex((item) => item.id === over.id);
      
      const newOrder = arrayMove(specialties, oldIndex, newIndex);
      
      const updatePromises = newOrder.map((item, index) => 
        apiRequest("PUT", `/api/admin/specialties/${item.id}`, { 
          order: index
        })
      );
      
      Promise.all(updatePromises).then(() => {
        queryClient.invalidateQueries({ queryKey: ["/api/admin/specialties"] });
        queryClient.invalidateQueries({ queryKey: ["/api/specialties"] });
        toast({ title: "Ordem das especialidades atualizada!" });
      }).catch(() => {
        toast({ title: "Erro ao atualizar ordem", variant: "destructive" });
      });
    }
  };

  const onSubmit = (data: SpecialtyForm) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (specialty: Specialty) => {
    setEditingItem(specialty);
    
    setTimeout(() => {
      form.setValue("title", specialty.title || "");
      form.setValue("description", specialty.description || "");
      form.setValue("icon", specialty.icon || "Brain");
      form.setValue("iconColor", specialty.iconColor || "#ec4899");
      form.setValue("isActive", specialty.isActive ?? true);
      form.setValue("order", specialty.order || 0);
    }, 100);
    
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Minhas Especialidades</h3>
          <p className="text-sm text-muted-foreground">
            Configure suas áreas de expertise exibidas na seção "Sobre"
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Especialidade
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Editar Especialidade" : "Nova Especialidade"}
              </DialogTitle>
              <DialogDescription>
                Configure as informações da sua especialidade
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Ansiedade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Técnicas para controlar preocupações excessivas..." rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ícone</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um ícone" />
                            </SelectTrigger>
                            <SelectContent className="max-h-80">
                              {/* Ícones de Saúde Mental */}
                              <SelectItem value="Brain"><Brain className="w-4 h-4 mr-2 inline" />Cérebro</SelectItem>
                              <SelectItem value="Heart"><Heart className="w-4 h-4 mr-2 inline" />Coração</SelectItem>
                              <SelectItem value="Shield"><Shield className="w-4 h-4 mr-2 inline" />Escudo/Proteção</SelectItem>
                              <SelectItem value="Target"><Target className="w-4 h-4 mr-2 inline" />Foco/Objetivo</SelectItem>
                              <SelectItem value="Activity"><Activity className="w-4 h-4 mr-2 inline" />Atividade</SelectItem>
                              <SelectItem value="Zap"><Zap className="w-4 h-4 mr-2 inline" />Energia</SelectItem>
                              
                              {/* Ícones de Bem-estar */}
                              <SelectItem value="Sun"><Sun className="w-4 h-4 mr-2 inline" />Sol</SelectItem>
                              <SelectItem value="Moon"><Moon className="w-4 h-4 mr-2 inline" />Lua</SelectItem>
                              <SelectItem value="Star"><Star className="w-4 h-4 mr-2 inline" />Estrela</SelectItem>
                              <SelectItem value="Sparkles"><Sparkles className="w-4 h-4 mr-2 inline" />Brilhos</SelectItem>
                              
                              {/* Ícones de Relacionamento */}
                              <SelectItem value="Users"><Users className="w-4 h-4 mr-2 inline" />Pessoas</SelectItem>
                              <SelectItem value="Handshake"><Handshake className="w-4 h-4 mr-2 inline" />Aperto de Mão</SelectItem>
                              <SelectItem value="MessageCircle"><MessageCircle className="w-4 h-4 mr-2 inline" />Conversa</SelectItem>
                              <SelectItem value="HelpCircle"><HelpCircle className="w-4 h-4 mr-2 inline" />Ajuda</SelectItem>
                              
                              {/* Ícones de Crescimento */}
                              <SelectItem value="TrendingUp"><TrendingUp className="w-4 h-4 mr-2 inline" />Crescimento</SelectItem>
                              <SelectItem value="Award"><Award className="w-4 h-4 mr-2 inline" />Prêmio</SelectItem>
                              <SelectItem value="BookOpen"><BookOpen className="w-4 h-4 mr-2 inline" />Livro</SelectItem>
                              
                              {/* Ícones de Natureza */}
                              <SelectItem value="Leaf"><Leaf className="w-4 h-4 mr-2 inline" />Folha</SelectItem>
                              <SelectItem value="Flower"><Flower className="w-4 h-4 mr-2 inline" />Flor</SelectItem>
                              <SelectItem value="TreePine"><TreePine className="w-4 h-4 mr-2 inline" />Árvore</SelectItem>
                              
                              {/* Ícones de Orientação */}
                              <SelectItem value="Compass"><Compass className="w-4 h-4 mr-2 inline" />Bússola</SelectItem>
                              <SelectItem value="Map"><MapPin className="w-4 h-4 mr-2 inline" />Localização</SelectItem>
                              
                              {/* Ícones de Tempo */}
                              <SelectItem value="Clock"><Clock className="w-4 h-4 mr-2 inline" />Relógio</SelectItem>
                              <SelectItem value="Timer"><Timer className="w-4 h-4 mr-2 inline" />Cronômetro</SelectItem>
                              
                              {/* Ícones Adicionais */}
                              <SelectItem value="Puzzle"><Puzzle className="w-4 h-4 mr-2 inline" />Quebra-cabeça</SelectItem>
                              <SelectItem value="Palette"><Palette className="w-4 h-4 mr-2 inline" />Paleta</SelectItem>
                              <SelectItem value="Waves"><Waves className="w-4 h-4 mr-2 inline" />Ondas</SelectItem>
                              <SelectItem value="Mountain"><Mountain className="w-4 h-4 mr-2 inline" />Montanha</SelectItem>
                              <SelectItem value="Wind"><Wind className="w-4 h-4 mr-2 inline" />Vento</SelectItem>
                              <SelectItem value="Umbrella"><Umbrella className="w-4 h-4 mr-2 inline" />Guarda-chuva</SelectItem>
                              <SelectItem value="LifeBuoy"><LifeBuoy className="w-4 h-4 mr-2 inline" />Boia</SelectItem>
                              <SelectItem value="Home"><Home className="w-4 h-4 mr-2 inline" />Casa</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="iconColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cor do Ícone</FormLabel>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Input type="color" className="w-12 h-10" {...field} />
                          </FormControl>
                          <FormControl>
                            <Input placeholder="#ec4899" {...field} />
                          </FormControl>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          O fundo será automaticamente 20% mais suave
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Ativo</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Exibir esta especialidade
                            </div>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <FormLabel className="text-sm">Prioridade</FormLabel>
                    <div className="flex flex-col sm:flex-row gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => {
                          const currentOrder = form.getValues("order");
                          form.setValue("order", Math.max(0, currentOrder - 1));
                        }}
                      >
                        <ChevronUp className="w-3 h-3" />
                        <span className="hidden sm:inline ml-1">Subir</span>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => {
                          const currentOrder = form.getValues("order");
                          form.setValue("order", currentOrder + 1);
                        }}
                      >
                        <ChevronDown className="w-3 h-3" />
                        <span className="hidden sm:inline ml-1">Descer</span>
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      Ordem: {form.watch("order")}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {editingItem ? "Atualizar" : "Criar"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 <strong>Dica:</strong> Arraste e solte as especialidades para reordenar. A cor do fundo será automaticamente mais suave (20% da cor do ícone).
        </p>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={specialties.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {specialties
              .sort((a, b) => a.order - b.order)
              .map((specialty) => (
              <SortableSpecialtyItem 
                key={specialty.id} 
                specialty={specialty}
                onEdit={() => openEditDialog(specialty)}
                onDelete={() => deleteMutation.mutate(specialty.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {specialties.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Nenhuma especialidade cadastrada ainda.</p>
          <p className="text-sm">Clique em "Nova Especialidade" para começar.</p>
        </div>
      )}
    </div>
  );
}

function SortableSpecialtyItem({ specialty, onEdit, onDelete }: { 
  specialty: Specialty; 
  onEdit: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: specialty.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Função para converter cor hex em RGB e depois em tom mais suave
  const getSoftColor = (hexColor: string) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const softR = Math.round(r * 0.2 + 255 * 0.8);
    const softG = Math.round(g * 0.2 + 255 * 0.8);
    const softB = Math.round(b * 0.2 + 255 * 0.8);
    return `rgb(${softR}, ${softG}, ${softB})`;
  };

  // Mapeamento de ícones
  const iconMap: Record<string, any> = {
    Brain, Heart, Users, Star, BookOpen, Award, Shield, Sun, Moon, Sparkles, Target,
    Handshake, HelpCircle, MessageCircle, Leaf, Flower, Compass, TrendingUp
  };

  const IconComponent = iconMap[specialty.icon] || Brain;
  const softBgColor = getSoftColor(specialty.iconColor);

  return (
    <Card ref={setNodeRef} style={style} className="p-4 cursor-move">
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing mt-1 flex-shrink-0">
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: softBgColor }}
          >
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: specialty.iconColor }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h4 className="font-semibold text-sm sm:text-base truncate">{specialty.title}</h4>
              <Badge variant={specialty.isActive ? "default" : "secondary"} className="text-xs flex-shrink-0">
                {specialty.isActive ? "Ativo" : "Inativo"}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{specialty.description}</p>
            <p className="text-xs text-gray-400 mt-1">Ordem: {specialty.order}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
          <Button variant="outline" size="sm" onClick={onEdit} className="h-8 w-8 sm:w-auto p-0 sm:px-3">
            <Edit className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Editar</span>
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete} className="h-8 w-8 sm:w-auto p-0 sm:px-3">
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Excluir</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function AppearanceSettings({ configs }: { configs: SiteConfig[] }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getConfigValue = (key: string) => {
    const config = configs.find(c => c.key === key);
    return config ? config.value : {};
  };

  const colorsConfig = getConfigValue('colors') as any;

  const appearanceSchema = z.object({
    primary: z.string().min(1, "Cor primária é obrigatória"),
    secondary: z.string().min(1, "Cor secundária é obrigatória"),
    accent: z.string().min(1, "Cor de destaque é obrigatória"),
    background: z.string().min(1, "Background é obrigatório"),
  });

  // Presets de cores pastéis femininas
  const colorPresets = {
    primary: [
      { name: "Rosa Vibrante", value: "#ec4899" },
      { name: "Coral Suave", value: "#fb7185" },
      { name: "Pêssego", value: "#fb923c" },
      { name: "Lavanda", value: "#a855f7" },
      { name: "Rosa Bebê", value: "#f472b6" },
      { name: "Salmão", value: "#f87171" }
    ],
    secondary: [
      { name: "Roxo Suave", value: "#8b5cf6" },
      { name: "Lilás", value: "#a78bfa" },
      { name: "Rosa Claro", value: "#f9a8d4" },
      { name: "Azul Pastel", value: "#7dd3fc" },
      { name: "Verde Mint", value: "#6ee7b7" },
      { name: "Amarelo Suave", value: "#fde047" }
    ],
    accent: [
      { name: "Índigo", value: "#6366f1" },
      { name: "Violeta", value: "#8b5cf6" },
      { name: "Rosa Escuro", value: "#e11d48" },
      { name: "Azul Royal", value: "#3b82f6" },
      { name: "Verde Esmeralda", value: "#10b981" },
      { name: "Laranja Vibrante", value: "#f97316" }
    ]
  };

  type AppearanceForm = z.infer<typeof appearanceSchema>;

  const form = useForm<AppearanceForm>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      primary: "#ec4899",
      secondary: "#8b5cf6", 
      accent: "#6366f1",
      background: "linear-gradient(135deg, hsl(276, 100%, 95%) 0%, hsl(339, 100%, 95%) 50%, hsl(276, 100%, 95%) 100%)",
    },
  });

  // Popula o formulário com as cores atuais quando os dados chegam
  React.useEffect(() => {
    if (colorsConfig && Object.keys(colorsConfig).length > 0) {
      console.log("Carregando configurações de cores:", colorsConfig);
      form.setValue("primary", colorsConfig.primary || "#ec4899");
      form.setValue("secondary", colorsConfig.secondary || "#8b5cf6");
      form.setValue("accent", colorsConfig.accent || "#6366f1");
      form.setValue("background", colorsConfig.background || "linear-gradient(135deg, hsl(276, 100%, 95%) 0%, hsl(339, 100%, 95%) 50%, hsl(276, 100%, 95%) 100%)");
    }
  }, [colorsConfig, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: AppearanceForm) => {
      const response = await apiRequest("POST", "/api/admin/config", {
        key: "colors",
        value: data
      });
      return response.json();
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/config"] });
      
      // Aplica as cores dinamicamente ao site
      applyColorsToSite(variables);
      
      toast({ title: "Configurações de aparência atualizadas com sucesso!" });
    },
  });

  // Função para aplicar cores dinamicamente ao site
  const applyColorsToSite = (colors: AppearanceForm) => {
    const root = document.documentElement;
    
    // Converte hex para HSL para compatibilidade
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      
      return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
    };
    
    // Aplica as cores personalizadas
    root.style.setProperty('--coral', colors.primary);
    root.style.setProperty('--purple-soft', colors.secondary);
    root.style.setProperty('--primary', `hsl(${hexToHsl(colors.primary)})`);
    
    // Atualiza background gradient se especificado
    if (colors.background.includes('gradient')) {
      const style = document.createElement('style');
      style.innerHTML = `.gradient-bg { background: ${colors.background} !important; }`;
      document.head.appendChild(style);
    }
  };

  const onSubmit = (data: AppearanceForm) => {
    updateMutation.mutate(data);
  };

  const presetBackgrounds = [
    {
      name: "Rosa para Roxo (Atual)",
      value: "linear-gradient(135deg, hsl(276, 100%, 95%) 0%, hsl(339, 100%, 95%) 50%, hsl(276, 100%, 95%) 100%)"
    },
    {
      name: "Roxo para Rosa",
      value: "linear-gradient(135deg, hsl(339, 100%, 95%) 0%, hsl(276, 100%, 95%) 50%, hsl(339, 100%, 95%) 100%)"
    },
    {
      name: "Pêssego Suave",
      value: "linear-gradient(135deg, hsl(20, 100%, 94%) 0%, hsl(35, 100%, 92%) 50%, hsl(20, 100%, 94%) 100%)"
    },
    {
      name: "Lavanda Dreamy",
      value: "linear-gradient(135deg, hsl(260, 60%, 92%) 0%, hsl(280, 70%, 95%) 50%, hsl(260, 60%, 92%) 100%)"
    },
    {
      name: "Rosa Coral",
      value: "linear-gradient(135deg, hsl(350, 80%, 92%) 0%, hsl(15, 85%, 90%) 50%, hsl(350, 80%, 92%) 100%)"
    },
    {
      name: "Mint Fresh",
      value: "linear-gradient(135deg, hsl(160, 70%, 90%) 0%, hsl(180, 65%, 92%) 50%, hsl(160, 70%, 90%) 100%)"
    },
    {
      name: "Céu Pastel",
      value: "linear-gradient(135deg, hsl(200, 80%, 92%) 0%, hsl(220, 75%, 94%) 50%, hsl(200, 80%, 92%) 100%)"
    },
    {
      name: "Sunset Warm",
      value: "linear-gradient(135deg, hsl(45, 90%, 88%) 0%, hsl(25, 85%, 85%) 50%, hsl(45, 90%, 88%) 100%)"
    },
    {
      name: "Lilás Soft",
      value: "linear-gradient(135deg, hsl(290, 50%, 90%) 0%, hsl(310, 55%, 92%) 50%, hsl(290, 50%, 90%) 100%)"
    },
    {
      name: "Gradiente Animado - Aurora",
      value: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
      animated: true,
      css: `
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: aurora-gradient 15s ease infinite;
      `
    },
    {
      name: "Gradiente Animado - Sunset",
      value: "linear-gradient(-45deg, #ff9a9e, #fecfef, #fecfef, #ff9a9e)",
      animated: true,
      css: `
        background: linear-gradient(-45deg, #ff9a9e, #fecfef, #fecfef, #ff9a9e);
        background-size: 400% 400%;
        animation: sunset-gradient 12s ease infinite;
      `
    },
    {
      name: "Gradiente Animado - Ocean",
      value: "linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)",
      animated: true,
      css: `
        background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
        background-size: 400% 400%;
        animation: ocean-gradient 18s ease infinite;
      `
    },
    {
      name: "Gradiente Animado - Primavera",
      value: "linear-gradient(-45deg, #a8edea, #fed6e3, #d299c2, #fef9d7)",
      animated: true,
      css: `
        background: linear-gradient(-45deg, #a8edea, #fed6e3, #d299c2, #fef9d7);
        background-size: 400% 400%;
        animation: spring-gradient 20s ease infinite;
      `
    },
    {
      name: "Neutro Elegante",
      value: "linear-gradient(135deg, hsl(0, 0%, 98%) 0%, hsl(0, 0%, 96%) 50%, hsl(0, 0%, 98%) 100%)"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Configurações de Aparência
        </CardTitle>
        <CardDescription>
          Personalize as cores e o visual do site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="primary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor Primária</FormLabel>
                    <div className="text-sm text-muted-foreground mb-2">
                      Cor principal dos botões, títulos em destaque e elementos interativos (botão "Saiba mais", título principal)
                    </div>
                    <FormControl>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Input type="color" className="w-12 h-10" {...field} />
                          <Input placeholder="#ec4899" {...field} />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {colorPresets.primary.map((preset) => (
                            <Button
                              key={preset.name}
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 p-1 flex items-center space-x-1"
                              onClick={() => form.setValue("primary", preset.value)}
                            >
                              <div 
                                className="w-4 h-4 rounded border"
                                style={{ backgroundColor: preset.value }}
                              />
                              <span className="text-xs">{preset.name}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor Secundária</FormLabel>
                    <div className="text-sm text-muted-foreground mb-2">
                      Cor dos gradientes, fundos de cartões e elementos secundários (cards de serviços, fundos suaves)
                    </div>
                    <FormControl>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Input type="color" className="w-12 h-10" {...field} />
                          <Input placeholder="#8b5cf6" {...field} />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {colorPresets.secondary.map((preset) => (
                            <Button
                              key={preset.name}
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 p-1 flex items-center space-x-1"
                              onClick={() => form.setValue("secondary", preset.value)}
                            >
                              <div 
                                className="w-4 h-4 rounded border"
                                style={{ backgroundColor: preset.value }}
                              />
                              <span className="text-xs">{preset.name}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor de Destaque</FormLabel>
                    <div className="text-sm text-muted-foreground mb-2">
                      Cor para hover nos botões, bordas ao passar o mouse e sombras de destaque (efeitos visuais especiais)
                    </div>
                    <FormControl>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Input type="color" className="w-12 h-10" {...field} />
                          <Input placeholder="#6366f1" {...field} />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {colorPresets.accent.map((preset) => (
                            <Button
                              key={preset.name}
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 p-1 flex items-center space-x-1"
                              onClick={() => form.setValue("accent", preset.value)}
                            >
                              <div 
                                className="w-4 h-4 rounded border"
                                style={{ backgroundColor: preset.value }}
                              />
                              <span className="text-xs">{preset.name}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="background"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Gradiente</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="linear-gradient(...)" 
                      rows={3} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <label className="text-sm font-medium">Presets de Background ✨</label>
              <div className="text-sm text-muted-foreground">
                Inclui gradientes animados que trocam de cor automaticamente!
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                {presetBackgrounds.map((preset) => (
                  <Button
                    key={preset.name}
                    type="button"
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-start space-y-2"
                    onClick={() => form.setValue("background", preset.value)}
                  >
                    <div 
                      className="w-full h-8 rounded border"
                      style={{ 
                        background: preset.value,
                        backgroundSize: preset.animated ? "400% 400%" : "100% 100%"
                      }}
                    />
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-medium">{preset.name}</span>
                      {preset.animated && (
                        <span className="text-xs text-purple-600">🌈 Gradiente Animado</span>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="text-sm font-medium mb-3">Prévia das Cores</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div 
                    className="w-full h-12 rounded border"
                    style={{ backgroundColor: form.watch("primary") }}
                  />
                  <span className="text-xs text-gray-500 mt-1 block">Primária</span>
                </div>
                <div className="text-center">
                  <div 
                    className="w-full h-12 rounded border"
                    style={{ backgroundColor: form.watch("secondary") }}
                  />
                  <span className="text-xs text-gray-500 mt-1 block">Secundária</span>
                </div>
                <div className="text-center">
                  <div 
                    className="w-full h-12 rounded border"
                    style={{ backgroundColor: form.watch("accent") }}
                  />
                  <span className="text-xs text-gray-500 mt-1 block">Destaque</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Salvando..." : "Salvar Aparência"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function ContactScheduleManager({ contactSettings }: { contactSettings: any }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingContact, setEditingContact] = useState<any | null>(null);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactItems, setContactItems] = useState<any[]>([]);

  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (contactSettings) {
      setContactItems(contactSettings.contact_items || []);
    }
  }, [contactSettings]);

  const contactSchema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    description: z.string().optional(),
    icon: z.string().min(1, "Ícone é obrigatório"),
    color: z.string().min(1, "Cor é obrigatória"),
    link: z.string().min(1, "Link é obrigatório"),
    isActive: z.boolean(),
    order: z.number().min(0),
  });

  const scheduleSchema = z.object({
    weekdays: z.string().min(1, "Horário dos dias úteis é obrigatório"),
    saturday: z.string().min(1, "Horário do sábado é obrigatório"),
    sunday: z.string().min(1, "Horário do domingo é obrigatório"),
    additional_info: z.string().optional(),
  });

  const locationSchema = z.object({
    city: z.string().min(1, "Cidade é obrigatória"),
    maps_link: z.string().min(1, "Link do Google Maps é obrigatório"),
  });

  type ContactForm = z.infer<typeof contactSchema>;
  type ScheduleForm = z.infer<typeof scheduleSchema>;
  type LocationForm = z.infer<typeof locationSchema>;

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "FaWhatsapp",
      color: "#25D366",
      link: "",
      isActive: true,
      order: 0,
    },
  });

  const scheduleForm = useForm<ScheduleForm>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      weekdays: contactSettings?.schedule_info?.weekdays || "Segunda à Sexta: 8h às 18h",
      saturday: contactSettings?.schedule_info?.saturday || "Sábado: 8h às 12h",
      sunday: contactSettings?.schedule_info?.sunday || "Domingo: Fechado",
      additional_info: contactSettings?.schedule_info?.additional_info || "",
    },
  });

  const locationForm = useForm<LocationForm>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      city: contactSettings?.location_info?.city || "Campo Mourão, Paraná",
      maps_link: contactSettings?.location_info?.maps_link || "https://maps.google.com/search/Campo+Mourão+Paraná",
    },
  });

  useEffect(() => {
    if (contactSettings) {
      scheduleForm.reset({
        weekdays: contactSettings.schedule_info?.weekdays || "Segunda à Sexta: 8h às 18h",
        saturday: contactSettings.schedule_info?.saturday || "Sábado: 8h às 12h",
        sunday: contactSettings.schedule_info?.sunday || "Domingo: Fechado",
        additional_info: contactSettings.schedule_info?.additional_info || "",
      });
      locationForm.reset({
        city: contactSettings.location_info?.city || "Campo Mourão, Paraná",
        maps_link: contactSettings.location_info?.maps_link || "https://maps.google.com/search/Campo+Mourão+Paraná",
      });
    }
  }, [contactSettings, scheduleForm, locationForm]);

  const updateContactSettings = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("PUT", "/api/admin/contact-settings", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-settings"] });
      toast({ title: "Configurações atualizadas com sucesso!" });
    },
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      const oldIndex = contactItems.findIndex((item) => item.id === active.id);
      const newIndex = contactItems.findIndex((item) => item.id === over.id);
      
      const newItems = arrayMove(contactItems, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index
      }));
      
      setContactItems(newItems);
      updateContactSettings.mutate({ contact_items: newItems });
    }
  };

  const onSubmitContact = (data: ContactForm) => {
    let newItems;
    
    if (editingContact) {
      newItems = contactItems.map(item => 
        item.id === editingContact.id ? { ...item, ...data } : item
      );
    } else {
      const newId = Math.max(...contactItems.map(c => c.id), 0) + 1;
      const newItem = {
        id: newId,
        type: data.title.toLowerCase(),
        ...data,
        order: contactItems.length
      };
      newItems = [...contactItems, newItem];
    }
    
    setContactItems(newItems);
    updateContactSettings.mutate({ contact_items: newItems });
    setIsContactDialogOpen(false);
    contactForm.reset();
  };

  const onSubmitSchedule = (data: ScheduleForm) => {
    updateContactSettings.mutate({ schedule_info: data });
  };

  const onSubmitLocation = (data: LocationForm) => {
    updateContactSettings.mutate({ location_info: data });
  };

  const openEditContact = (contact: any) => {
    setEditingContact(contact);
    contactForm.reset({
      title: contact.title,
      description: contact.description || "",
      icon: contact.icon,
      color: contact.color,
      link: contact.link,
      isActive: contact.isActive,
      order: contact.order,
    });
    setIsContactDialogOpen(true);
  };

  const deleteContact = (id: number) => {
    const newItems = contactItems.filter(item => item.id !== id);
    setContactItems(newItems);
    updateContactSettings.mutate({ contact_items: newItems });
  };

  const iconOptions = [
    { value: "FaWhatsapp", label: "WhatsApp", icon: "💬" },
    { value: "FaInstagram", label: "Instagram", icon: "📷" },
    { value: "Mail", label: "Email", icon: "📧" },
    { value: "FaLinkedin", label: "LinkedIn", icon: "💼" },
    { value: "FaFacebook", label: "Facebook", icon: "👥" },
    { value: "FaTwitter", label: "Twitter", icon: "🐦" },
    { value: "FaTelegram", label: "Telegram", icon: "✈️" },
    { value: "Phone", label: "Telefone", icon: "📞" },
    { value: "MapPin", label: "Localização", icon: "📍" },
    { value: "Globe", label: "Website", icon: "🌐" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Botões de Contato</CardTitle>
                <CardDescription>
                  Configure os botões de contato exibidos na seção de agendamento
                </CardDescription>
              </div>
              <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingContact(null);
                    contactForm.reset();
                    setIsContactDialogOpen(true);
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Contato
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingContact ? "Editar Contato" : "Novo Contato"}
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...contactForm}>
                    <form onSubmit={contactForm.handleSubmit(onSubmitContact)} className="space-y-4">
                      <FormField
                        control={contactForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                              <Input placeholder="WhatsApp" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição (Opcional)</FormLabel>
                            <FormControl>
                              <Input placeholder="(44) 998-362-704" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={contactForm.control}
                          name="icon"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ícone</FormLabel>
                              <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {iconOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.icon} {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={contactForm.control}
                          name="color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cor</FormLabel>
                              <div className="flex items-center space-x-2">
                                <FormControl>
                                  <Input type="color" className="w-12 h-10" {...field} />
                                </FormControl>
                                <FormControl>
                                  <Input placeholder="#25D366" {...field} />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={contactForm.control}
                        name="link"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                              <Input placeholder="https://wa.me/5544998362704" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={contactForm.control}
                          name="order"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ordem</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={contactForm.control}
                          name="isActive"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Ativo</FormLabel>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit">
                          {editingContact ? "Atualizar" : "Criar"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={contactItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {contactItems
                    .sort((a, b) => a.order - b.order)
                    .map((contact) => (
                    <SortableContactItem 
                      key={contact.id} 
                      contact={contact}
                      onEdit={() => openEditContact(contact)}
                      onDelete={() => deleteContact(contact.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Horários de Funcionamento</CardTitle>
              <CardDescription>
                Configure os horários de atendimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...scheduleForm}>
                <form onSubmit={scheduleForm.handleSubmit(onSubmitSchedule)} className="space-y-4">
                  <FormField
                    control={scheduleForm.control}
                    name="weekdays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Segunda à Sexta</FormLabel>
                        <FormControl>
                          <Input placeholder="8h às 18h" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={scheduleForm.control}
                    name="saturday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sábado</FormLabel>
                        <FormControl>
                          <Input placeholder="8h às 12h" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={scheduleForm.control}
                    name="sunday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domingo</FormLabel>
                        <FormControl>
                          <Input placeholder="Fechado" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={scheduleForm.control}
                    name="additional_info"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Informações Adicionais</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Horários flexíveis disponíveis" rows={2} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Salvar Horários
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Localização</CardTitle>
              <CardDescription>
                Configure cidade e link do Google Maps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...locationForm}>
                <form onSubmit={locationForm.handleSubmit(onSubmitLocation)} className="space-y-4">
                  <FormField
                    control={locationForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Campo Mourão, Paraná" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={locationForm.control}
                    name="maps_link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link do Google Maps</FormLabel>
                        <FormControl>
                          <Input placeholder="https://maps.google.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Salvar Localização
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SortableContactItem({ contact, onEdit, onDelete }: { 
  contact: any; 
  onEdit: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: contact.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-4 cursor-move">
      <div className="flex justify-between items-start">
        <div className="flex-1 flex items-start gap-4">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing mt-1">
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: contact.color }}
          >
            <span className="text-white text-sm">
              {contact.icon === 'FaWhatsapp' ? '💬' :
               contact.icon === 'FaInstagram' ? '📷' :
               contact.icon === 'Mail' ? '📧' :
               contact.icon === 'FaLinkedin' ? '💼' : '📞'}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{contact.title}</h4>
              <Badge variant={contact.isActive ? "default" : "secondary"} className="text-xs">
                {contact.isActive ? "Ativo" : "Inativo"}
              </Badge>
            </div>
            {contact.description && (
              <p className="text-sm text-muted-foreground">{contact.description}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">Ordem: {contact.order}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

function FooterManager({ footerSettings }: { footerSettings: any }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingContact, setEditingContact] = useState<any | null>(null);
  const [editingCertification, setEditingCertification] = useState<any | null>(null);
  const [editingSeal, setEditingSeal] = useState<any | null>(null);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isCertificationDialogOpen, setIsCertificationDialogOpen] = useState(false);
  const [isSealDialogOpen, setIsSealDialogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const footerData = footerSettings || {};
  const generalInfo = footerData.general_info || {};
  const contactButtons = footerData.contact_buttons || [];
  const certificationItems = footerData.certification_items || [];
  const trustSeals = footerData.trust_seals || [];
  const bottomInfo = footerData.bottom_info || {};

  const updateFooterSettings = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("PUT", "/api/admin/footer-settings", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/footer-settings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/footer-settings"] });
      toast({ title: "Configurações do rodapé atualizadas com sucesso!" });
    },
  });

  const generalSchema = z.object({
    description: z.string().min(1, "Descrição é obrigatória"),
    cnpj: z.string().min(1, "CNPJ é obrigatório"),
    showCnpj: z.boolean(),
    copyright: z.string().min(1, "Copyright é obrigatório"),
    certificationText: z.string().min(1, "Texto de certificações é obrigatório"),
  });

  const generalForm = useForm({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      description: generalInfo.description || "Cuidando da sua saúde mental com carinho e dedicação",
      cnpj: generalInfo.cnpj || "12.345.678/0001-90",
      showCnpj: generalInfo.showCnpj ?? true,
      copyright: bottomInfo.copyright || "© 2024 Dra. Adrielle Benhossi • Todos os direitos reservados",
      certificationText: bottomInfo.certificationText || "Registrada no Conselho Federal de Psicologia<br/>Sigilo e ética profissional",
    },
  });

  const onSubmitGeneral = (data: any) => {
    const updates = {
      general_info: {
        description: data.description,
        cnpj: data.cnpj,
        showCnpj: data.showCnpj,
      },
      bottom_info: {
        copyright: data.copyright,
        certificationText: data.certificationText,
      }
    };
    updateFooterSettings.mutate(updates);
  };

  const iconOptions = [
    { value: "FaWhatsapp", label: "WhatsApp", icon: "💬" },
    { value: "FaInstagram", label: "Instagram", icon: "📷" },
    { value: "FaLinkedin", label: "LinkedIn", icon: "💼" },
    { value: "FaFacebook", label: "Facebook", icon: "👥" },
    { value: "FaTwitter", label: "Twitter", icon: "🐦" },
  ];

  const gradientOptions = [
    { name: "Verde WhatsApp", value: "from-green-400 to-green-500" },
    { name: "Rosa Instagram", value: "from-purple-400 to-pink-500" },
    { name: "Azul LinkedIn", value: "from-blue-500 to-blue-600" },
    { name: "Azul Facebook", value: "from-blue-600 to-blue-700" },
    { name: "Azul Twitter", value: "from-blue-400 to-blue-500" },
    { name: "Roxo Personalizado", value: "from-purple-500 to-purple-600" },
    { name: "Rosa Personalizado", value: "from-pink-500 to-pink-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Informações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Gerais do Rodapé</CardTitle>
          <CardDescription>
            Configure os textos principais, CNPJ e informações de copyright
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...generalForm}>
            <form onSubmit={generalForm.handleSubmit(onSubmitGeneral)} className="space-y-4">
              <FormField
                control={generalForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição Principal</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descrição que aparece abaixo do nome da psicóloga" rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={generalForm.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ</FormLabel>
                      <FormControl>
                        <Input placeholder="12.345.678/0001-90" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={generalForm.control}
                  name="showCnpj"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Exibir CNPJ</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Mostrar CNPJ no rodapé
                        </div>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={generalForm.control}
                name="copyright"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto de Copyright</FormLabel>
                    <FormControl>
                      <Input placeholder="© 2024 Dra. Adrielle Benhossi..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={generalForm.control}
                name="certificationText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto de Certificações</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Registrada no Conselho Federal de Psicologia..." 
                        rows={3} 
                        {...field} 
                      />
                    </FormControl>
                    <div className="text-xs text-muted-foreground">
                      Use &lt;br/&gt; para quebrar linhas. Aparece abaixo dos ícones de certificação.
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={generalForm.control}
                name="schedulingButtonColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor do Botão de Agendamento</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-3">
                        <Input 
                          type="color" 
                          className="w-16 h-10 p-1 border rounded" 
                          {...field} 
                        />
                        <Input 
                          placeholder="#25D366" 
                          className="flex-1" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <div className="text-xs text-muted-foreground">
                      Cor usada no botão "Agendar consulta" da seção hero
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Salvar Informações Gerais</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Botões de Contato */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Botões de Contato</CardTitle>
              <CardDescription>
                Configure os botões de redes sociais e contato do rodapé
              </CardDescription>
            </div>
            <Button onClick={() => setIsContactDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Botão
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contactButtons
              .sort((a: any, b: any) => a.order - b.order)
              .map((button: any) => (
                <Card key={button.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${button.gradient} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-sm">
                          {iconOptions.find(icon => icon.value === button.icon)?.icon || "📧"}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{button.label}</h4>
                        <p className="text-sm text-muted-foreground">{button.link}</p>
                      </div>
                      <Badge variant={button.isActive ? "default" : "secondary"}>
                        {button.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        setEditingContact(button);
                        setIsContactDialogOpen(true);
                      }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => {
                        const newButtons = contactButtons.filter((b: any) => b.id !== button.id);
                        updateFooterSettings.mutate({ contact_buttons: newButtons });
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Outros componentes continuam... */}

      {/* Dialog para editar botões de contato */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingContact ? "Editar Botão de Contato" : "Novo Botão de Contato"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Label</label>
              <Input placeholder="WhatsApp" />
            </div>
            <div>
              <label className="text-sm font-medium">Link</label>
              <Input placeholder="https://wa.me/..." />
            </div>
            <div>
              <label className="text-sm font-medium">Ícone</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um ícone" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Gradiente</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um gradiente" />
                </SelectTrigger>
                <SelectContent>
                  {gradientOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setIsContactDialogOpen(false);
                setEditingContact(null);
              }}>
                Cancelar
              </Button>
              <Button onClick={() => {
                setIsContactDialogOpen(false);
                setEditingContact(null);
                toast({ title: "Botão salvo com sucesso!" });
              }}>
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MarketingSettings({ configs }: { configs: SiteConfig[] }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const marketingSchema = z.object({
    facebookPixel1: z.string().optional(),
    facebookPixel2: z.string().optional(),
    googlePixel: z.string().optional(),
    enableGoogleIndexing: z.boolean().default(true),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.string().optional(),
  });

  type MarketingForm = z.infer<typeof marketingSchema>;

  // Extrair valores das configurações de forma segura
  const getMarketingData = () => {
    const marketingInfo = configs?.find(c => c.key === 'marketing_pixels')?.value as any || {};
    const seoInfo = configs?.find(c => c.key === 'seo_meta')?.value as any || {};
    
    return {
      facebookPixel1: marketingInfo.facebookPixel1 || "",
      facebookPixel2: marketingInfo.facebookPixel2 || "",
      googlePixel: marketingInfo.googlePixel || "",
      enableGoogleIndexing: marketingInfo.enableGoogleIndexing ?? true,
      metaTitle: seoInfo.metaTitle || "Dra. Adrielle Benhossi - Psicóloga em Campo Mourão | Terapia Online e Presencial",
      metaDescription: seoInfo.metaDescription || "Psicóloga CRP 08/123456 em Campo Mourão. Atendimento presencial e online. Especialista em terapia cognitivo-comportamental para seu bem-estar emocional.",
      metaKeywords: seoInfo.metaKeywords || "psicóloga, Campo Mourão, terapia online, consulta psicológica, saúde mental, CRP, terapia cognitivo-comportamental",
    };
  };

  const form = useForm<MarketingForm>({
    resolver: zodResolver(marketingSchema),
    defaultValues: getMarketingData(),
  });

  // Atualiza o formulário quando as configurações mudam
  React.useEffect(() => {
    if (configs && configs.length > 0) {
      const newData = getMarketingData();
      form.reset(newData);
    }
  }, [configs, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: MarketingForm) => {
      const promises = [
        // Atualiza as configurações de marketing
        apiRequest("POST", "/api/admin/config", {
          key: 'marketing_pixels',
          value: {
            facebookPixel1: data.facebookPixel1,
            facebookPixel2: data.facebookPixel2,
            googlePixel: data.googlePixel,
            enableGoogleIndexing: data.enableGoogleIndexing,
          }
        }),
        // Atualiza as configurações de SEO
        apiRequest("POST", "/api/admin/config", {
          key: 'seo_meta',
          value: {
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            metaKeywords: data.metaKeywords,
          }
        })
      ];
      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/config"] });
      toast({ title: "Configurações de marketing salvas com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao salvar configurações", variant: "destructive" });
    },
  });

  const onSubmit = (data: MarketingForm) => {
    updateMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Configurações de Marketing
        </CardTitle>
        <CardDescription>
          Configure os pixels de rastreamento para Facebook e Google Ads
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Informações sobre pixels */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">📊 O que são Pixels de Rastreamento?</h4>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              Os pixels são códigos que permitem rastrear visitantes do seu site para criar campanhas publicitárias mais eficazes.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="bg-white p-3 rounded border border-blue-100">
                <h5 className="font-medium text-blue-900">🔵 Facebook Pixel</h5>
                <p className="text-xs mt-1">
                  Rastreia visitantes para criar públicos personalizados e anúncios direcionados no Facebook e Instagram.
                </p>
              </div>
              <div className="bg-white p-3 rounded border border-blue-100">
                <h5 className="font-medium text-blue-900">🟢 Google Pixel</h5>
                <p className="text-xs mt-1">
                  Coleta dados para otimizar campanhas no Google Ads usando inteligência artificial para encontrar clientes ideais.
                </p>
              </div>
            </div>
            <p className="text-xs mt-3 font-medium">
              💡 <strong>Dica:</strong> Com estes pixels configurados, seu gestor de tráfego pode usar IA para otimizar anúncios automaticamente e encontrar pessoas similares aos seus melhores clientes.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Facebook Pixels */}
            <div className="space-y-4">
              <h4 className="font-medium text-blue-900 flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
                Facebook Pixels (até 2)
              </h4>
              
              <FormField
                control={form.control}
                name="facebookPixel1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook Pixel #1 (Principal)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: 1234567890123456" 
                        {...field} 
                        className="font-mono"
                      />
                    </FormControl>
                    <div className="text-xs text-muted-foreground">
                      Encontre seu Pixel ID no Facebook Business Manager → Eventos → Pixels
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebookPixel2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook Pixel #2 (Opcional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: 9876543210987654" 
                        {...field} 
                        className="font-mono"
                      />
                    </FormControl>
                    <div className="text-xs text-muted-foreground">
                      Segundo pixel para campanhas específicas ou backup
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="googlePixel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                    Google Analytics / Google Ads ID
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: G-XXXXXXXXXX ou AW-XXXXXXXXX" 
                      {...field} 
                      className="font-mono"
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">
                    Use G-XXXXXXXXXX para Google Analytics ou AW-XXXXXXXXX para Google Ads
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Controle de Indexação Google */}
            <FormField
              control={form.control}
              name="enableGoogleIndexing"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-2">
                      <FormLabel className="text-base flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Permitir Indexação no Google
                      </FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Controla se o site aparece nos resultados de busca do Google
                      </div>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                  </div>
                  
                  {!field.value && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Ban className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-red-900">⚠️ Indexação Desabilitada</h5>
                          <p className="text-sm text-red-800 mt-1">
                            Com esta opção desativada, o arquivo robots.txt impedirá que o Google e outros mecanismos de busca indexem seu site. 
                            Isso significa que seu site <strong>NÃO aparecerá</strong> nos resultados de pesquisa orgânica.
                          </p>
                          <p className="text-xs text-red-700 mt-2">
                            💡 Use apenas durante desenvolvimento ou se desejar manter o site privado para buscadores.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {field.value && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Search className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-green-900">✅ Indexação Habilitada</h5>
                          <p className="text-sm text-green-800 mt-1">
                            Seu site será indexado pelo Google e aparecerá nos resultados de busca. 
                            Isso é essencial para SEO e visibilidade online.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Seção de SEO */}
            <div className="border-t pt-6 mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                🔍 SEO e Meta Informações
              </h4>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título da Página (SEO)</FormLabel>
                      <FormControl>
                        <Input placeholder="Dra. Adrielle Benhossi - Psicóloga em Campo Mourão | Terapia Online e Presencial" {...field} />
                      </FormControl>
                      <div className="text-xs text-muted-foreground">
                        Aparece na aba do navegador e nos resultados do Google (recomendado: até 60 caracteres)
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição da Página (SEO)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Psicóloga CRP 08/123456 em Campo Mourão. Atendimento presencial e online. Especialista em terapia cognitivo-comportamental para seu bem-estar emocional." rows={3} {...field} />
                      </FormControl>
                      <div className="text-xs text-muted-foreground">
                        Aparece nos resultados do Google abaixo do título (recomendado: até 160 caracteres)
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="metaKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Palavras-chave (SEO)</FormLabel>
                      <FormControl>
                        <Input placeholder="psicóloga, Campo Mourão, terapia online, consulta psicológica, saúde mental, CRP" {...field} />
                      </FormControl>
                      <div className="text-xs text-muted-foreground">
                        Palavras separadas por vírgula que descrevem seu conteúdo
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Salvando..." : "Salvar Configurações"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}